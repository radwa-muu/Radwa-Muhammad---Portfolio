import React, { useState, useEffect, useRef } from 'react';
import { VideoScript } from '../utils/portfolioData';
import { parseDuration, formatSeconds } from '../utils/portfolioLogic';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  Clapperboard,
  FileText,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';

interface VideoPlayerModalProps {
  script: VideoScript | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ script, onClose }) => {
  const { data, isEditMode, setIsEditMode, updateScript } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const totalDurationSeconds = script ? parseDuration(script.duration) || 60 : 60;
  const [actualDuration, setActualDuration] = useState(totalDurationSeconds);
  const [activeTab, setActiveTab] = useState<'script' | 'direction'>('script');

  const liveScript = script
    ? data.videoScripts.find((s) => s.id === script.id) || script
    : null;
  const hasRealVideo = Boolean(liveScript?.videoSrc);

  useEffect(() => {
    setIsPlaying(false);
    setIsMuted(false);
    setCurrentSeconds(0);
    setActualDuration(liveScript ? parseDuration(liveScript.duration) || 60 : 60);
  }, [liveScript?.id, liveScript?.duration]);

  if (!liveScript) return null;

  const togglePlay = () => {
    if (!hasRealVideo || !videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!hasRealVideo || !videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleReset = () => {
    if (!hasRealVideo || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handleFullscreen = () => {
    const el = videoRef.current || playerContainerRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasRealVideo || !videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = ratio * actualDuration;
    videoRef.current.currentTime = targetSec;
    setCurrentSeconds(targetSec);
  };

  const progressPercent = actualDuration > 0 ? (currentSeconds / actualDuration) * 100 : 0;

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-50 bg-black/94 flex items-center justify-center p-3 sm:p-6 overflow-y-auto modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-player-title"
    >
      <div className="relative max-w-xl sm:max-w-2xl w-full bg-[#121212] rounded-3xl p-4 sm:p-7 border border-[#2a2a2a] shadow-2xl flex flex-col my-auto max-h-[92dvh] overflow-y-auto modal-panel-enter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-stone-400 hover:text-white p-2 rounded-full bg-stone-900/90 hover:bg-[#dc2626] transition-colors duration-300 ease-out z-30 cursor-pointer"
          aria-label="Close modal | إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Header */}
        <div className="mb-4 pr-10 pl-1 text-left">
          <div className="flex items-center gap-2 mb-2 flex-wrap font-body-plex">
            <span className="text-[11px] font-semibold text-[#ef4444] bg-[#dc2626]/10 px-2.5 py-0.5 rounded border border-[#dc2626]/30">
              {liveScript.videoNum ? `VIDEO ${liveScript.videoNum}` : 'SCRIPT PREVIEW'}
            </span>
            <span className="text-xs text-stone-400">
              {liveScript.categoryEn} | {liveScript.categoryAr}
            </span>
          </div>

          <h4
            id="video-player-title"
            className="font-displayEn text-3xl sm:text-4xl font-normal text-white uppercase tracking-[0.03em] leading-[0.95]"
          >
            <EditableText
              as="span"
              value={liveScript.titleEn}
              onChange={(val) => updateScript(liveScript.id, { titleEn: val })}
            />
          </h4>
          <EditableText
            as="p"
            dir="rtl"
            value={liveScript.titleAr}
            onChange={(val) => updateScript(liveScript.id, { titleAr: val })}
            className="font-body-plex text-base sm:text-lg font-bold text-[#E9DEDE]/90 text-right mt-1.5 leading-snug"
          />

          <div className="mt-2 space-y-1">
            <EditableText
              as="p"
              multiline
              value={liveScript.summaryEn}
              onChange={(val) => updateScript(liveScript.id, { summaryEn: val })}
              className="text-xs sm:text-sm text-stone-300 font-body-plex leading-relaxed"
            />
            <EditableText
              as="p"
              multiline
              dir="rtl"
              value={liveScript.summaryAr}
              onChange={(val) => updateScript(liveScript.id, { summaryAr: val })}
              className="text-xs sm:text-sm text-stone-300/90 font-body-plex leading-relaxed text-right"
            />
          </div>
        </div>

        {/* Main Real HTML5 Video Frame */}
        <div
          ref={playerContainerRef}
          className="relative w-full aspect-video sm:aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-[#2a2a2a] flex flex-col justify-between p-4 shadow-2xl group shrink-0"
        >
          {hasRealVideo ? (
            <video
              ref={videoRef}
              src={liveScript.videoSrc}
              poster={liveScript.posterImg}
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-contain bg-black z-0"
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onVolumeChange={() => {
                if (videoRef.current) setIsMuted(videoRef.current.muted);
              }}
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentSeconds(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  setActualDuration(videoRef.current.duration || totalDurationSeconds);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#160509] via-[#090305] to-black z-0">
              {liveScript.posterImg && (
                <img
                  src={liveScript.posterImg}
                  alt={liveScript.titleEn}
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                />
              )}
              <div className="relative z-10 max-w-md space-y-2 bg-black/85 border border-white/10 rounded-2xl p-5 font-body-plex">
                <FileText className="w-7 h-7 text-[#ef4444] mx-auto" />
                <p className="text-sm font-semibold text-white">Video Asset Pending Upload</p>
                <p className="text-xs text-stone-400">Read the full spoken script and visual/editor notes below.</p>
              </div>
            </div>
          )}

          {/* Top Overlay Badge */}
          <div className="flex justify-between items-center text-xs text-white/90 z-10 pointer-events-none font-body-plex">
            <span className="bg-black/85 px-3 py-1 rounded-full text-[11px] font-semibold text-[#ef4444] border border-white/10 flex items-center gap-1.5">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>{hasRealVideo ? 'Client Video | فيديو العميل' : 'Script Brief'}</span>
            </span>
            <span className="text-xs bg-black/85 px-2.5 py-1 rounded border border-white/10 text-stone-200 tabular-nums font-medium">
              {liveScript.duration}
            </span>
          </div>

          {/* Center Play Overlay */}
          {hasRealVideo && (
            <div
              onClick={togglePlay}
              className={`my-auto text-center space-y-3 z-10 transition-opacity duration-300 ease-out cursor-pointer ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 mx-auto rounded-full bg-[#dc2626]/90 hover:bg-[#dc2626] border border-white/40 flex items-center justify-center text-white shadow-[0_0_35px_rgba(220,38,38,0.8)] cursor-pointer hover:scale-105 active:scale-95 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                )}
              </button>

              {liveScript.quoteAr && (
                <div className="bg-black/90 px-4 py-2 rounded-xl border border-white/15 max-w-[90%] mx-auto shadow-lg pointer-events-none">
                  <p dir="rtl" className="text-xs sm:text-sm font-body-plex font-semibold text-amber-300 leading-snug">
                    {liveScript.quoteAr}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Timeline & Real HTML5 Controls */}
          {hasRealVideo && (
            <div className="z-10 space-y-2 pt-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 rounded-xl">
              <div
                className="w-full bg-white/25 hover:bg-white/35 h-2 rounded-full overflow-hidden cursor-pointer transition-colors relative"
                onClick={handleScrub}
                title="Click to seek | اضغط للتنقل"
              >
                <div
                  className="bg-[#dc2626] h-full transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-stone-200 font-body-plex">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="hover:text-white p-1 text-stone-300 transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="hover:text-white p-1 text-stone-300 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <span className="tabular-nums">{formatSeconds(Math.floor(currentSeconds))}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="tabular-nums">{formatSeconds(Math.floor(actualDuration))}</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="hover:text-white p-1 text-stone-300 transition-colors cursor-pointer"
                    title="Restart video"
                    aria-label="Restart video"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="hover:text-white p-1 text-stone-300 transition-colors cursor-pointer"
                    title="Fullscreen"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Script & Technical Tabs */}
        <div className="mt-5">
          <div className="flex flex-wrap gap-2 border-b border-[#2a2a2a] pb-2 mb-3">
            <button
              type="button"
              onClick={() => setActiveTab('script')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 ease-out cursor-pointer ${
                activeTab === 'script'
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-[#1c1917] text-stone-400 hover:text-white'
              }`}
            >
              SPOKEN SCRIPT | النص الكامل
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direction')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 ease-out cursor-pointer ${
                activeTab === 'direction'
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-[#1c1917] text-stone-400 hover:text-white'
              }`}
            >
              CAMERA &amp; EDITOR NOTES | التوجيه والمونتاج
            </button>
          </div>

          {activeTab === 'script' ? (
            <div key="script-tab" className="space-y-3 max-h-56 overflow-y-auto pr-1 font-body-plex slide-fade-enter">
              {(liveScript.scriptFullEn || isEditMode) && (
                <div className="bg-[#171717] p-4 rounded-xl border border-[#262626]">
                  <div className="text-[11px] font-body-plex text-[#ef4444] mb-2 uppercase font-bold tracking-wider">
                    ENGLISH TRANSLATION / SCRIPT
                  </div>
                  <EditableText
                    as="div"
                    multiline
                    value={liveScript.scriptFullEn}
                    onChange={(val) => updateScript(liveScript.id, { scriptFullEn: val })}
                    className="text-xs sm:text-sm text-stone-200 font-body-plex leading-relaxed whitespace-pre-line"
                  />
                </div>
              )}

              <div className="bg-[#171717] p-4 rounded-xl border border-[#262626]">
                <div className="text-[11px] font-body-plex text-[#ef4444] mb-2 uppercase font-bold tracking-wider">
                  ORIGINAL ARABIC SCRIPT | السكربت العربي
                </div>
                <EditableText
                  as="div"
                  multiline
                  dir="rtl"
                  value={liveScript.scriptFullAr}
                  onChange={(val) => updateScript(liveScript.id, { scriptFullAr: val })}
                  className="text-xs sm:text-sm text-stone-200 font-body-plex leading-relaxed whitespace-pre-line text-right"
                />
              </div>
            </div>
          ) : (
            <div key="direction-tab" className="bg-[#171717] p-4 rounded-xl border border-[#262626] space-y-3 text-xs max-h-56 overflow-y-auto font-body-plex slide-fade-enter">
              <div>
                <strong className="text-stone-300 block font-semibold mb-1 uppercase text-[11px] tracking-wider">
                  CAMERA MOTION &amp; VISUAL DIRECTION | حركة الكاميرا وتوجيه الممثل:
                </strong>
                <EditableText
                  as="p"
                  multiline
                  dir="rtl"
                  value={liveScript.visualDirectionAr}
                  onChange={(val) => updateScript(liveScript.id, { visualDirectionAr: val })}
                  className="text-stone-300 leading-relaxed font-body-plex text-right"
                />
              </div>
              {(liveScript.editorNotesAr || isEditMode) && (
                <div className="pt-2 border-t border-[#262626]">
                  <strong className="text-amber-400 block font-semibold mb-1 uppercase text-[11px] tracking-wider">
                    EDITOR &amp; AUDIO PACING NOTES | توجيهات المونتير والصوت:
                  </strong>
                  <EditableText
                    as="p"
                    multiline
                    dir="rtl"
                    value={liveScript.editorNotesAr || ''}
                    onChange={(val) => updateScript(liveScript.id, { editorNotesAr: val })}
                    className="text-stone-300 leading-relaxed font-body-plex text-right"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-5 pt-3 border-t border-[#262626] flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 font-body-plex">
          <span className="text-[11px] font-medium tracking-wider text-stone-500">
            {isEditMode
              ? 'EDIT MODE ACTIVE — وضع التعديل مفعّل'
              : 'RADWA MUHAMMAD — SCRIPTWRITING & EDITORIAL'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 ease-out cursor-pointer ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#dc2626]/20 hover:bg-[#dc2626]/35 text-red-200 border border-[#dc2626]/40'
              }`}
            >
              {isEditMode ? 'DONE | تم التعديل' : 'EDIT SCRIPT | تعديل النص'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#262626] hover:bg-[#333333] rounded-full text-white text-xs font-bold transition-colors duration-300 ease-out cursor-pointer"
            >
              CLOSE | إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
