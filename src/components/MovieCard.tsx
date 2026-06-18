import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Movie } from '../types';
import { useWatchlist } from '../hooks/useWatchlist';
import { Bookmark, BookmarkCheck } from './Icons';

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { toggleWatchlist, isStored } = useWatchlist();
  const isPinned = isStored(movie.imdbID);
  const location = useLocation();

  return (
    <div
      className="group relative rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
      }}
    >
      <Link to={`/movie/${movie.imdbID}`} state={{ from: location.pathname }} className="block overflow-hidden aspect-[2/3]"
        style={{ background: 'var(--bg-input)' }}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400'}
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); toggleWatchlist(movie); }}
        className="absolute top-3 right-3 py-1.5 px-2.5 rounded-full backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 hover:shadow-lg"
        style={isPinned
          ? { background: 'var(--accent)', color: 'var(--accent-text)', border: '1px solid transparent', fontFamily: 'var(--font-mono)' }
          : { background: 'rgba(13,15,20,0.75)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.18)', fontFamily: 'var(--font-mono)' }
        }
        onMouseEnter={e => {
          if (isPinned) {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#ef4444';
          } else {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent-text)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }
        }}
        onMouseLeave={e => {
          if (isPinned) {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent-text)';
            e.currentTarget.style.borderColor = 'transparent';
          } else {
            e.currentTarget.style.background = 'rgba(13,15,20,0.75)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
          }
        }}
      >
        {isPinned ? (
          <>
            <BookmarkCheck size={12} />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Bookmark size={12} />
            <span>Save</span>
          </>
        )}
      </button>

      <div className="p-3 flex flex-col flex-1 justify-between">
        <Link to={`/movie/${movie.imdbID}`} state={{ from: location.pathname }}>
          <h3
            className="font-semibold line-clamp-1 mb-1 transition-colors group-hover:opacity-80 text-sm"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {movie.Title}
          </h3>
        </Link>
        <span
          className="text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {movie.Year}
        </span>
      </div>
    </div>
  );
};