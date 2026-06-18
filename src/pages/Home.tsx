import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovieSearch } from '../hooks/useMovieQueries';
import { useDebounce } from '../hooks/useDebounce';
import { MovieCard } from '../components/MovieCard';
import { Search, Loader2, ChevronLeft, ChevronRight } from '../components/Icons';

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState(() => searchParams.get('q') || '');
  const [page, setPage] = useState(() => Number(searchParams.get('page') || '1'));

  const debouncedSearch = useDebounce(input, 400);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch.trim()) params.q = debouncedSearch.trim();
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, page, setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const { data, isLoading, isError, error } = useMovieSearch(debouncedSearch, page);

  const totalPages = data?.totalResults ? Math.ceil(Number(data.totalResults) / 10) : 0;

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto text-center space-y-4 pt-4">
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-1"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          Discover Your Next Favorite{' '}
          <span style={{ color: 'var(--accent)' }}>Movie.</span>
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          Search from millions of titles and build your personal watchlist.
        </p>

        <div className="relative mt-6 mb-1 pb-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies by title (e.g. Inception)..."
            className="w-full pl-11 pr-4 py-3 rounded-3xl text-sm transition-all outline-none"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <p
          className="text-xs text-right transition-all duration-200"
          style={{
            fontFamily: 'var(--font-mono)',
            color: input.trim().length > 0 && input.trim().length < 3 ? 'var(--accent)' : 'var(--text-muted)',
            opacity: input.trim().length > 0 && input.trim().length < 3 ? 1 : 0.6,
          }}
        >
          {input.trim().length > 0 && input.trim().length < 3
            ? 'Please type at least 3 characters to search.'
            : 'Type at least 3 characters to search.'}
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ color: 'var(--text-muted)' }}>
          <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          <p className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>Fetching movies...</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-16 text-sm" style={{ color: '#ef4444' }}>
          {(error as Error).message}
        </div>
      )}

      {data?.Response === 'False' && input.trim().length >= 3 && (
        <div
          className="text-center py-12 px-6 max-w-md mx-auto space-y-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <div className="inline-flex p-3.5 rounded-full" style={{ background: 'var(--bg-input)', color: 'var(--accent)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
              <path d="m4 11 16-3" />
              <path d="m4 7 16-3v4l-16 3V7Z" />
              <path d="m8 6 2-2" />
              <path d="m13 5 2-2" />
              <path d="m18 4 2-2" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              No movies found for &ldquo;{debouncedSearch || input}&rdquo;
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Try a different title or check your spelling.
            </p>
          </div>
        </div>
      )}

      {data?.Response === 'True' && data.Search && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              {data.totalResults || data.Search?.length || 0} results for{' '}
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                &ldquo;{debouncedSearch}&rdquo;
              </span>
              {' '}
              {totalPages > 1 && `(Page ${page} of ${totalPages})`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-5">
            {data.Search.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end mt-12">
              <div className="flex items-center gap-3" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="text-xs mr-1" style={{ color: 'var(--text-muted)' }}>
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || isLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-3xl border text-xs font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 active:enabled:scale-95"
                  style={{
                    background: 'var(--bg-input)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={e => { if (page !== 1) e.currentTarget.style.background = 'var(--bg-card)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-input)'; }}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages || isLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-3xl border text-xs font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 active:enabled:scale-95"
                  style={{
                    background: 'var(--bg-input)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={e => { if (page < totalPages) e.currentTarget.style.background = 'var(--bg-card)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-input)'; }}
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};