import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface LazyVideoPlayerProps {
  src: string;
  poster?: string;
  ariaLabel: string;
  objectFit?: 'cover' | 'contain';
}

export const LazyVideoPlayer: React.FC<LazyVideoPlayerProps> = ({
  src,
  poster,
  ariaLabel,
  objectFit = 'cover',
}) => {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        autoPlay
        playsInline
        preload="auto"
        className={`w-full h-full slide-fade-enter ${objectFit === 'contain' ? 'object-contain bg-black' : 'object-cover'}`}
        aria-label={ariaLabel}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="relative w-full h-full block bg-black group/play cursor-pointer focus:outline-none"
      aria-label={`Play ${ariaLabel}`}
    >
      {poster ? (
        <img
          src={poster}
          alt={ariaLabel}
          loading="lazy"
          decoding="async"
          className={`w-full h-full ${objectFit === 'contain' ? 'object-contain bg-black' : 'object-cover'}`}
        />
      ) : (
        <div className="w-full h-full bg-[#120608]" />
      )}

      {/* Subtle dark vignette + centered Play trigger */}
      <div className="absolute inset-0 bg-black/20 group-hover/play:bg-black/30 group-active/play:bg-black/40 transition-colors duration-300 ease-out flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-black/80 group-hover/play:bg-[#b81d33] group-active/play:bg-[#dc2626] group-active/play:scale-90 border border-white/30 group-hover/play:border-white/80 flex items-center justify-center text-white shadow-[0_8px_28px_rgba(0,0,0,0.75)] transition-[background-color,border-color,transform] duration-300 ease-out">
          <Play className="w-6 h-6 fill-white translate-x-0.5" />
        </span>
      </div>
    </button>
  );
};
