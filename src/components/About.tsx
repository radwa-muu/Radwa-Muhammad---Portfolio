import React, { useState, useEffect } from 'react';
import { Camera, RotateCcw } from 'lucide-react';
import defaultPortrait from '../assets/images/radwa_profile_portrait_1794498063144.jpg';
import referenceSilhouette from '../assets/images/radwa_about_silhouette.jpg';
import { usePortfolio } from '../context/PortfolioContext';
import { EditableText } from './EditableText';

const STORAGE_KEY = 'radwa_custom_profile_image';

export const About: React.FC = () => {
  const { data, isEditMode, updateAbout } = usePortfolio();
  const [profileImage, setProfileImage] = useState<string>(defaultPortrait);
  const [hasCustomImage, setHasCustomImage] = useState<boolean>(false);
  const [usePhoto, setUsePhoto] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfileImage(saved);
        setHasCustomImage(true);
        setUsePhoto(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfileImage(result);
          setHasCustomImage(true);
          setUsePhoto(true);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch {
            // storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setProfileImage(defaultPortrait);
    setHasCustomImage(false);
    setUsePhoto(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const aboutBodyClass =
    'font-body-plex font-medium text-[17px] leading-[1.68] text-[#F5F2F1]';

  return (
    <section id="about" className="py-14 px-10 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 items-center">
        {/* Left Column: Huge ABOUT ME + prominent overlapping عني, EN above AR */}
        <div className="col-span-7 flex flex-col space-y-7 text-left z-10">
          <div className="relative inline-block w-fit select-none pb-14 cursor-default interactive-lockup">
            <h2
              className="font-displayEn font-normal uppercase tracking-[0.02em] leading-[0.86] text-heading-linear"
              style={{ fontSize: 'clamp(72px, calc(14.5 * var(--vw, 1vw)), 208px)' }}
            >
              ABOUT ME
            </h2>
            <p
              className="text-[106px] font-amiri font-bold text-white absolute left-1/2 -translate-x-1/2 bottom-5 whitespace-nowrap leading-none"
              style={{ textShadow: '0 10px 26px rgba(0, 0, 0, 0.9)' }}
            >
              عني
            </p>
          </div>

          <div className="space-y-4 max-w-[620px] pt-1 rounded-xl px-3 -mx-3 py-2 interactive-panel">
            <EditableText
              as="p"
              multiline
              value={data.about.introEn}
              onChange={(val) => updateAbout({ introEn: val })}
              className={aboutBodyClass}
            />
            <EditableText
              as="p"
              multiline
              value={data.about.descEn}
              onChange={(val) => updateAbout({ descEn: val })}
              className={aboutBodyClass}
            />
          </div>

          <div className="max-w-[620px] w-full flex justify-center py-0.5">
            <div className="w-72 h-[1px] bg-white/15" />
          </div>

          <div className="space-y-4 max-w-[620px] text-right rounded-xl px-3 -mx-3 py-2 interactive-panel" dir="rtl">
            <EditableText
              as="p"
              multiline
              dir="rtl"
              value={data.about.introAr}
              onChange={(val) => updateAbout({ introAr: val })}
              className={aboutBodyClass}
            />
            <EditableText
              as="p"
              multiline
              dir="rtl"
              value={data.about.descAr}
              onChange={(val) => updateAbout({ descAr: val })}
              className={aboutBodyClass}
            />
          </div>
        </div>

        {/* Right Column: Silhouette / Portrait without hover scaling or maskImage compositing */}
        <div className="col-span-5 flex justify-end items-center relative">
          <div className="relative w-full max-w-[540px] aspect-[5/6] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 active:-translate-y-1">
            {usePhoto ? (
              <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-[0_0_60px_rgba(138,21,38,0.4)]">
                <img
                  src={profileImage}
                  alt="Radwa Muhammad — Content Marketer | رضوى محمد"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070204]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div
                className="relative w-full h-full"
                style={{
                  WebkitMaskImage:
                    'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 32%, rgba(0, 0, 0, 0.78) 54%, rgba(0, 0, 0, 0.34) 74%, rgba(0, 0, 0, 0.08) 88%, transparent 98%)',
                  maskImage:
                    'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 32%, rgba(0, 0, 0, 0.78) 54%, rgba(0, 0, 0, 0.34) 74%, rgba(0, 0, 0, 0.08) 88%, transparent 98%)',
                }}
              >
                <img
                  src={referenceSilhouette}
                  alt="Radwa Muhammad — Artistic Silhouette | رضوى محمد"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            )}

            {isEditMode && (
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-20">
                <label
                  className="px-3 py-1.5 rounded-full bg-black/85 border border-[#8A1526]/70 text-[11px] text-white flex items-center gap-1.5 cursor-pointer hover:bg-[#68101C] transition-colors duration-300 ease-out shadow-lg"
                  title="Upload personal photo | رفع صورة شخصية"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{usePhoto ? 'تغيير الصورة' : 'رفع صورة شخصية'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setUsePhoto(!usePhoto)}
                  className="px-2.5 py-1.5 rounded-full bg-black/85 border border-white/20 text-[11px] text-[#E9DEDE] hover:text-white hover:bg-neutral-800 transition-colors duration-300 ease-out cursor-pointer"
                  title="Toggle Silhouette / Photo"
                >
                  {usePhoto ? 'عرض الصورة الأصلية' : 'عرض الصورة الشخصية'}
                </button>

                {hasCustomImage && (
                  <button
                    onClick={resetImage}
                    className="p-1.5 rounded-full bg-black/85 border border-white/20 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-300 ease-out cursor-pointer"
                    title="Reset to default silhouette"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
