import { useQuery } from '@tanstack/react-query';
import type { SearchResponse, MovieDetail } from '../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

export function useMovieSearch(searchTerm: string, page: number = 1) {
  return useQuery<SearchResponse>({
    queryKey: ['movies-search', searchTerm, page],
    queryFn: async () => {
      if (!searchTerm) return { Response: 'False', Error: 'Enter a movie title' };
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);
      if (!res.ok) throw new Error('Network issue encountered fetching records.');
      return res.json();
    },
    enabled: searchTerm.length > 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useMovieDetail(id: string | undefined) {
  return useQuery<MovieDetail>({
    queryKey: ['movie-detail', id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      if (!res.ok) throw new Error('Failed to grab structural metadata profiles.');
      const data = await res.json();
      if (data.Response === 'False') throw new Error(data.Error || 'Movie not found');
      return data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}