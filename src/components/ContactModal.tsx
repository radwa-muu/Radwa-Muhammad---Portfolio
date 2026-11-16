import React, { useState, useEffect } from 'react';
import { validateInquiry, InquiryFormState } from '../utils/portfolioLogic';
import { SERVICES_DATA, ServiceItem } from '../utils/portfolioData';
import { X, Send, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultService = ''
}) => {
  const [formState, setFormState] = useState<InquiryFormState>({
    name: '',
    email: '',
    service: defaultService || (lang === 'ar' ? SERVICES_DATA[0].titleAr : SERVICES_DATA[0].titleEn),
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setFormState((prev) => ({
        ...prev,
        service: defaultService || (lang === 'ar' ? SERVICES_DATA[0].titleAr : SERVICES_DATA[0].titleEn),
      }));
    }
  }, [isOpen, defaultService, lang]);

  if (!isOpen) return null;

  const radwaEmail = 'radwa.work30@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiry(formState, lang);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative max-w-lg w-full card-luxury rounded-3xl p-6 sm:p-8 border border-[#8A1526]/70 shadow-[0_0_60px_rgba(104,16,28,0.5)] my-auto modal-panel-enter">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-[#BDB5B5] hover:text-white p-2 rounded-full bg-black/40 hover:bg-[#8A1526] transition-colors duration-300 ease-out cursor-pointer`}
          aria-label={lang === 'ar' ? 'إغلاق' : 'Close modal'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className={`mb-6 ${lang === 'ar' ? 'pl-8 pr-1' : 'pr-8 pl-1'}`}>
          <p className="font-body-plex text-[11px] uppercase tracking-[0.18em] text-[#E86677] font-semibold mb-1.5">
            {lang === 'ar' ? 'استشارة استراتيجية' : 'Strategic Consultation'}
          </p>
          <h3 id="contact-modal-title" className={`text-2xl font-bold text-white leading-tight ${lang === 'ar' ? 'font-amiri text-3xl' : 'font-displayEn'}`}>
            {lang === 'ar' ? 'تواصل مع رضوى محمد' : 'Work with Radwa Muhammad'}
          </h3>
          <p className="text-xs text-[#BDB5B5] mt-1 font-body-plex">
            {lang === 'ar'
              ? 'أرسل تفاصيل مشروعك أو فكرتك، وسأرد عليك بخطة عمل ملائمة.'
              : 'Share your project vision or target brief, and I will get back with tailored strategy.'}
          </p>
        </div>

        {/* Direct Email Card */}
        <div className="bg-[#140306] p-3.5 rounded-2xl border border-[rgba(104,16,28,0.4)] flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#23070D] flex items-center justify-center text-[#8A1526] border border-[#8A1526]/30">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#BDB5B5] font-body-plex">{lang === 'ar' ? 'البريد المباشر' : 'Direct Email'}</span>
              <span className="text-xs font-body-plex font-bold text-white">{radwaEmail}</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 slide-fade-enter">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400 text-2xl">
              ✓
            </div>
            <h4 className="text-lg font-bold text-white font-arabicTitle">
              {lang === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Your message has been received!'}
            </h4>
            <p className="text-xs text-[#BDB5B5] leading-relaxed">
              {lang === 'ar'
                ? `شكرًا لتواصلك يا ${formState.name}. سأراجع تفاصيل مشروعك وأتواصل معك عبر ${formState.email} في أقرب وقت.`
                : `Thank you ${formState.name}. I will review your inquiry and reach back via ${formState.email} shortly.`}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={`mailto:${radwaEmail}?subject=${encodeURIComponent(`مشروع جديد: ${formState.service}`)}&body=${encodeURIComponent(`الاسم: ${formState.name}\n\nالتفاصيل: ${formState.message}`)}`}
                className="px-4 py-2 rounded-full bg-[#8A1526] hover:bg-[#b81d33] text-white text-xs font-bold transition-colors duration-300 ease-out"
              >
                {lang === 'ar' ? 'إرسال عبر تطبيق البريد' : 'Open in Mail App'}
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-[#23070D] text-white text-xs font-bold"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {lang === 'ar' ? 'الاسم أو الشركة *' : 'Your Name / Brand *'}
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder={lang === 'ar' ? 'مثال: عبد الله آل سعود' : 'e.g. Sarah Jenkins'}
                className="w-full bg-[#140306] border border-[rgba(104,16,28,0.5)] focus:border-[#8A1526] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#BDB5B5]/40 outline-none transition-colors duration-300 ease-out"
              />
              {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full bg-[#140306] border border-[rgba(104,16,28,0.5)] focus:border-[#8A1526] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#BDB5B5]/40 outline-none transition-colors duration-300 ease-out"
              />
              {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {lang === 'ar' ? 'الخدمة المطلوبة' : 'Requested Service'}
              </label>
              <select
                value={formState.service}
                onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                className="w-full bg-[#140306] border border-[rgba(104,16,28,0.5)] focus:border-[#8A1526] rounded-xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
              >
                {SERVICES_DATA.map((srv: ServiceItem) => (
                  <option key={srv.id} value={lang === 'ar' ? srv.titleAr : srv.titleEn} className="bg-[#140306]">
                    {lang === 'ar' ? srv.titleAr : srv.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">
                {lang === 'ar' ? 'تفاصيل فكرتك أو التحدي *' : 'Project Details / Scope *'}
              </label>
              <textarea
                rows={3}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder={
                  lang === 'ar'
                    ? 'اكتب نبذة عن مشروعك، الفئة المستهدفة، أو ما تحتاجه في الحملة...'
                    : 'Tell me about your product, audience, timeline or goals...'
                }
                className="w-full bg-[#140306] border border-[rgba(104,16,28,0.5)] focus:border-[#8A1526] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#BDB5B5]/40 outline-none transition-colors duration-300 ease-out resize-none"
              ></textarea>
              {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#8A1526] hover:bg-[#b81d33] text-white text-xs font-bold transition-[background-color,box-shadow,transform] duration-300 ease-out active:scale-[0.99] shadow-lg hover:shadow-[0_0_20px_rgba(138,21,38,0.6)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إرسال الطلب الآن' : 'Send Inquiry Now'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
