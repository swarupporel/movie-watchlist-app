import React from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import { MovieCard } from '../components/MovieCard';
import { Film } from '../components/Icons';

export const Watchlist: React.FC = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="space-y-6">
      <div className="pb-4">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          Your Watchlist
        </h1>
        
      </div>

      {watchlist.length === 0 ? (
        <div
          className="text-center py-12 px-6 max-w-md mx-auto space-y-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="inline-flex p-3.5 rounded-full" style={{ background: 'var(--bg-input)', color: 'var(--accent)' }}>
            <Film size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your watchlist is empty.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Explore the database and save movies you want to track.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};