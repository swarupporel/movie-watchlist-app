import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import type { Movie } from '../types';

export function useWatchlist() {
  const { userEmail } = useAuth();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const storageKey = `watchlist_${userEmail}`;

  const { data: watchlist = [] } = useQuery<Movie[]>({
    queryKey: ['watchlist', userEmail],
    queryFn: () => {
      if (!userEmail) return [];
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    },
    enabled: !!userEmail,
  });

  const toggleWatchlistMutation = useMutation({
    mutationFn: async (movie: Movie) => {
      const currentList: Movie[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const exists = currentList.some((m) => m.imdbID === movie.imdbID);
      
      let updatedList;
      if (exists) {
        updatedList = currentList.filter((m) => m.imdbID !== movie.imdbID);
      } else {
        updatedList = [...currentList, movie];
      }
      
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      return updatedList;
    },
    onMutate: async (movie) => {
      await queryClient.cancelQueries({ queryKey: ['watchlist', userEmail] });
      const previousWatchlist = queryClient.getQueryData<Movie[]>(['watchlist', userEmail]);

      const exists = previousWatchlist?.some((m) => m.imdbID === movie.imdbID) ?? false;
      if (exists) {
        addToast(`"${movie.Title}" removed from watchlist`, 'info');
      } else {
        addToast(`"${movie.Title}" added to watchlist`, 'success');
      }

      queryClient.setQueryData<Movie[]>(['watchlist', userEmail], (old = []) => {
        const exists = old.some((m) => m.imdbID === movie.imdbID);
        return exists ? old.filter((m) => m.imdbID !== movie.imdbID) : [...old, movie];
      });

      return { previousWatchlist };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(['watchlist', userEmail], context.previousWatchlist);
      }
      addToast('Failed to update watchlist', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', userEmail] });
    },
  });

  const isStored = (imdbID: string) => watchlist.some((m) => m.imdbID === imdbID);

  return {
    watchlist,
    toggleWatchlist: toggleWatchlistMutation.mutate,
    isStored,
  };
}