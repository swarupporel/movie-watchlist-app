import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Icons';

const POSTERS = [
  '/posters/poster_2.jpg',
  '/posters/poster_3.jpg',
  '/posters/poster_4.jpg',
  '/posters/poster_5.jpg',
  '/posters/poster_6.jpg',
  '/posters/poster_7.jpg',
  '/posters/poster_8.jpg',
  '/posters/poster_10.jpg',
  '/posters/poster_11.jpg',
  '/posters/poster_12.jpg',
  '/posters/poster_13.jpg',
  '/posters/poster_14.jpg',
  '/posters/poster_15.jpg',
  '/posters/poster_17.jpg',
  '/posters/poster_18.jpg',
];

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const Login: React.FC = () => {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const inputRef    = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 850));
    login(email);
    navigate('/');
  };

  const strip = [...POSTERS, ...POSTERS];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05050f] overflow-hidden z-0" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_50%,rgba(99,102,241,0.2)_0%,transparent_55%),radial-gradient(ellipse_70%_55%_at_85%_50%,rgba(236,72,153,0.14)_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_50%_10%,rgba(6,182,212,0.10)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div
        className="absolute left-0 right-0 h-[140px] overflow-hidden pointer-events-none top-0"
        style={{
          maskImage: 'linear-gradient(to top, transparent, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35))',
          WebkitMaskImage: 'linear-gradient(to top, transparent, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35))',
        }}
      >
        <div className="flex gap-[10px] w-max animate-scroll-right">
          {strip.map((src, i) => (
            <div key={i} className="w-[88px] h-[128px] rounded-lg overflow-hidden shrink-0 border border-white/[0.06]">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover brightness-[0.4] saturate-[0.6]"
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute left-0 right-0 h-[140px] overflow-hidden pointer-events-none bottom-0"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35))',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35))',
        }}
      >
        <div className="flex gap-[10px] w-max animate-scroll-left">
          {strip.map((src, i) => (
            <div key={i} className="w-[88px] h-[128px] rounded-lg overflow-hidden shrink-0 border border-white/[0.06]">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover brightness-[0.4] saturate-[0.6]"
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[430px] mx-5 bg-[#0a0b16]/80 border border-white/10 rounded-[28px] px-11 pt-12 pb-11 backdrop-blur-[32px] shadow-[0_0_0_1px_rgba(99,102,241,0.12)_inset,0_40px_80px_rgba(0,0,0,0.65),0_0_100px_rgba(99,102,241,0.07)] animate-slide-up">
        <div className="absolute top-0 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-[#6366f1]/80 via-[#ec4899]/55 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#6366f1]/30 to-transparent rounded-full" />

        <div className="flex flex-col items-center gap-1.5 mb-7 animate-logo-glow">
          <Logo height={36} />
          <span className="text-[0.72rem] tracking-[0.22em] uppercase text-white/30 font-medium mt-0.5">Your Movie Universe</span>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-7">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7rem] font-medium tracking-wide border border-white/[0.08] bg-white/[0.04] text-white/40">
            <StarIcon /> Ratings
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7rem] font-medium tracking-wide border border-white/[0.08] bg-white/[0.04] text-white/40">
            <BookmarkIcon /> Watchlist
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7rem] font-medium tracking-wide border border-white/[0.08] bg-white/[0.04] text-white/40">
            <SearchIcon /> Search
          </span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label
            className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white/35 mb-2"
            htmlFor="lp-email"
          >
            Email Address
          </label>
          <div className="relative mb-3.5 group">
            <input
              id="lp-email"
              ref={inputRef}
              className="w-full pl-11 pr-4 py-3 rounded-[14px] border border-white/[0.08] bg-white/[0.04] text-[#f0f2f5] text-[0.92rem] placeholder-white/[0.18] outline-none transition-all focus:border-[#6366f1]/65 focus:bg-[#6366f1]/[0.07] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              type="email"
              required
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/[0.22] pointer-events-none transition-colors group-focus-within:text-[#6366f1]/80">
              <MailIcon />
            </span>
          </div>

          {error && (
            <div className="text-[0.79rem] text-red-400 mt-1.5 px-3 py-2 rounded-lg bg-red-400/[0.09] border border-red-400/20 animate-slide-up">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-[14px] border-0 font-semibold text-lg tracking-wider cursor-pointer relative overflow-hidden bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white shadow-[0_4px_24px_rgba(99,102,241,0.45),0_1px_4px_rgba(0,0,0,0.5)] transition-all hover:enabled:-translate-y-0.5 hover:enabled:scale-[1.01] hover:enabled:shadow-[0_8px_34px_rgba(99,102,241,0.55)] active:enabled:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed"
            disabled={loading}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <div className="absolute inset-0 w-[55%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-18 animate-btn-shine pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-[17px] h-[17px] border-2 border-white/30 border-t-white rounded-full animate-spin" /> SIGNING IN…</>
                : <>ENTER MOVIETRACK <ArrowIcon /></>}
            </span>
          </button>
        </form>

        <div className="flex items-center gap-0 my-6">
          <div className="flex-1 h-[1px] bg-white/[0.07]" />
        </div>

        <p className="text-center text-[0.74rem] text-white/20 leading-[1.7]">
          No password required — just your email.
        </p>
      </div>
    </div>
  );
};