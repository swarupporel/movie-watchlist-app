import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovieQueries';
import { useWatchlist } from '../hooks/useWatchlist';
import { ArrowLeft, Bookmark, BookmarkCheck, Calendar, Clock, Star, Award, Loader2 } from '../components/Icons';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: movie, isLoading, isError, error } = useMovieDetail(id);
  const { toggleWatchlist, isStored } = useWatchlist();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: 'var(--accent)' }}
        />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div
        className="max-w-md mx-auto p-6 rounded-xl text-center space-y-3"
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          color: '#ef4444',
        }}
      >
        <p className="text-sm">{error?.message || 'Failed to retrieve entry metrics.'}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const hasSaved = isStored(movie.imdbID);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm transition-colors group cursor-pointer"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {location.state?.from?.includes('watchlist') ? 'Back to watchlist' : 'Back to search'}
      </button>

      <div
        className="flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-2xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
        }}
      >
        <div
          className="w-full md:w-64 lg:w-80 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-lg"
          style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}
        >
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center italic text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              No Poster Available
            </div>
          )}
        </div>

        <div className="flex-grow space-y-6">
          <div className="space-y-2">
            <h1
              className="text-2xl md:text-4xl font-extrabold leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
            >
              {movie.Title}
            </h1>
            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="flex items-center gap-1">
                <Calendar size={14} />{movie.Released}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />{movie.Runtime}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              >
                {movie.Rated}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleWatchlist({ Title: movie.Title, Year: movie.Year, imdbID: movie.imdbID, Type: movie.Type, Poster: movie.Poster })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer"
            style={hasSaved
              ? { background: 'var(--accent)', color: 'var(--accent-text)' }
              : { background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
            }
            onMouseEnter={e => {
              if (hasSaved) {
                e.currentTarget.style.background = '#ef4444';
              } else {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent-text)';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
            onMouseLeave={e => {
              if (hasSaved) {
                e.currentTarget.style.background = 'var(--accent)';
              } else {
                e.currentTarget.style.background = 'var(--bg-input)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }
            }}
          >
            {hasSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {hasSaved ? 'In Watchlist' : 'Add to Watchlist'}
          </button>

          <div className="space-y-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Plot Summary
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              >
                {movie.Plot}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Genre
                </h4>
                <p style={{ color: 'var(--text-primary)' }}>{movie.Genre}</p>
              </div>
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Director
                </h4>
                <p style={{ color: 'var(--text-primary)' }}>{movie.Director}</p>
              </div>
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> Ratings Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {movie.Ratings.map((r, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl text-center"
                      style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}
                    >
                      <div
                        className="font-bold text-sm"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {r.Value}
                      </div>
                      <div
                        className="text-[10px] uppercase mt-0.5"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                      >
                        {r.Source}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.Awards !== 'N/A' && (
              <div
                className="flex items-start gap-2.5 p-3 rounded-xl text-xs leading-normal"
                style={{
                  background: 'rgba(70,189,21,0.06)',
                  border: '1px solid rgba(70,189,21,0.15)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Award size={16} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
                <span>{movie.Awards}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};