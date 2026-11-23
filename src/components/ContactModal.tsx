import React, { useState, useEffect } from 'react';
import { validateInquiry, InquiryFormState } from '../utils/portfolioLogic';
import { SERVICES_DATA, ServiceItem } from '../utils/portfolioData';
import { X, Send, Mail, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';

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
  defaultService = '',
}) => {
  const isAr = lang === 'ar';
  const normalizedServices = SERVICES_DATA.map((srv: ServiceItem) => ({
    id: srv.id,
    label: (isAr ? srv.titleAr : srv.titleEn).replace(/\s+/g, ' ').trim(),
    matchEn: srv.titleEn.replace(/\s+/g, ' ').trim(),
    matchAr: srv.titleAr.replace(/\s+/g, ' ').trim(),
  }));

  const resolveService = (raw?: string): string => {
    const clean = (raw || '').replace(/\s+/g, ' ').trim();
    if (!clean) return normalizedServices[0].label;
    const found = normalizedServices.find(
      (s) => clean === s.label || clean.includes(s.matchAr) || clean.includes(s.matchEn)
    );
    return found ? found.label : clean;
  };

  const [formState, setFormState] = useState<InquiryFormState>(() => ({
    name: '',
    email: '',
    service: resolveService(defaultService),
    message: '',
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setFormState((prev) => ({
        ...prev,
        service: resolveService(defaultService),
      }));
    }
  }, [isOpen, defaultService, lang]);

  if (!isOpen) return null;

  const hasCustomServiceOption =
    Boolean(formState.service) &&
    !normalizedServices.some((s) => s.label === formState.service);

  const radwaEmail = 'radwa.work30@gmail.com';
  const radwaWhatsAppNumber = '201207845340';

  const whatsappDraftText = isAr
    ? [
        'مرحبًا رضوى،',
        `الاسم أو الشركة: ${formState.name.trim()}`,
        `البريد الإلكتروني: ${formState.email.trim()}`,
        `الخدمة المطلوبة: ${formState.service.trim()}`,
        `تفاصيل الفكرة:\n${formState.message.trim()}`,
      ].join('\n')
    : [
        'Hello Radwa,',
        `Name / Brand: ${formState.name.trim()}`,
        `Email: ${formState.email.trim()}`,
        `Requested Service: ${formState.service.trim()}`,
        `Project Details:\n${formState.message.trim()}`,
      ].join('\n');

  const whatsappUrl = `https://wa.me/${radwaWhatsAppNumber}?text=${encodeURIComponent(whatsappDraftText)}`;

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

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const result = validateInquiry(formState, lang);
    if (!result.isValid) {
      e.preventDefault();
      setErrors(result.errors);
      return;
    }

    setErrors({});
  };

  const inputBaseClass =
    'w-full font-body-plex bg-[#161012] border border-white/12 hover:border-white/25 focus:border-[#b81d33] focus:bg-[#1a1215] focus:ring-2 focus:ring-[#b81d33]/25 rounded-xl px-4 py-3 text-[13.5px] text-white placeholder-[#9C9393]/60 outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-out';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/94 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative max-w-lg w-full bg-[#0e090b] rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_48px_rgba(104,16,28,0.28)] my-auto max-h-[92dvh] overflow-y-auto modal-panel-enter font-body-plex">
        {/* Subtle top crimson accent hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-[#b81d33]/70 to-transparent pointer-events-none"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-3.5 ${isAr ? 'left-3.5' : 'right-3.5'} text-stone-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-[#b81d33] border border-white/10 transition-colors duration-300 ease-out cursor-pointer`}
          aria-label={isAr ? 'إغلاق' : 'Close modal'}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header — unified portfolio typography (Bebas Neue + IBM Plex Sans Arabic) */}
        <div className="mb-5 px-8 text-center">
          <span className="inline-block font-body-plex text-[11px] font-semibold tracking-wider text-[#ef4444] bg-[#dc2626]/10 px-2.5 py-0.5 rounded border border-[#dc2626]/30 mb-2.5">
            {isAr ? 'استشارة استراتيجية • CONSULTATION' : 'STRATEGIC CONSULTATION'}
          </span>

          <p className="font-displayEn text-2xl sm:text-3xl font-normal text-white/95 uppercase tracking-[0.04em] leading-none">
            WORK WITH RADWA MUHAMMAD
          </p>

          <h3
            id="contact-modal-title"
            className="font-body-plex text-lg sm:text-xl font-bold text-white leading-snug mt-1"
          >
            {isAr ? 'تواصل مع رضوى محمد' : 'Start a Project Inquiry'}
          </h3>

          <p className="font-body-plex text-[13px] text-[#BDB5B5] mt-1.5 leading-relaxed">
            {isAr
              ? 'أرسل تفاصيل مشروعك أو فكرتك، وسأرد عليك بخطة عمل ملائمة.'
              : 'Share your project vision or target brief, and I will get back with tailored strategy.'}
          </p>
        </div>

        {/* Direct Email Compact Row */}
        <a
          href={`mailto:${radwaEmail}`}
          className="group bg-[#161012] hover:bg-[#1b1316] px-4 py-3 rounded-xl border border-white/10 hover:border-[#8A1526]/60 flex items-center justify-between gap-3 mb-5 transition-[background-color,border-color] duration-300 ease-out"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#68101C]/25 flex items-center justify-center text-[#ef4444] border border-[#8A1526]/40 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#BDB5B5] font-body-plex">
                {isAr ? 'البريد المباشر' : 'Direct Email'}
              </span>
              <span dir="ltr" className="text-[13px] font-body-plex font-semibold text-white group-hover:text-[#fca5a5] transition-colors duration-300">
                {radwaEmail}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-body-plex text-[#BDB5B5]/70 group-hover:text-white transition-colors duration-300">
            {isAr ? 'مراسلة مباشرة' : 'Mail'}
          </span>
        </a>

        {submitted ? (
          <div className="bg-[#121a16] border border-emerald-500/35 p-6 rounded-2xl text-center space-y-3.5 slide-fade-enter font-body-plex">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-body-plex">
              {isAr ? 'تم تجهيز رسالتك بنجاح!' : 'Your inquiry is ready!'}
            </h4>
            <p className="text-[13px] text-[#BDB5B5] leading-relaxed font-body-plex">
              {isAr
                ? `شكرًا لتواصلك يا ${formState.name}. اضغط بالأسفل لإرسال التفاصيل مباشرة عبر البريد إلى ${radwaEmail}.`
                : `Thank you ${formState.name}. Click below to send your brief directly to ${radwaEmail}.`}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${radwaEmail}?subject=${encodeURIComponent(`مشروع جديد: ${formState.service}`)}&body=${encodeURIComponent(`الاسم: ${formState.name}\nالبريد: ${formState.email}\n\nالتفاصيل:\n${formState.message}`)}`}
                className="px-5 py-2.5 rounded-full bg-[#b81d33] hover:bg-[#dc2626] text-white text-xs font-body-plex font-semibold transition-colors duration-300 ease-out"
              >
                {isAr ? 'إرسال عبر تطبيق البريد' : 'Open in Mail App'}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-body-plex font-semibold transition-colors duration-300 ease-out cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-body-plex" noValidate>
            <div>
              <label className="font-body-plex text-[12.5px] font-semibold text-[#E9DEDE] block mb-1.5">
                {isAr ? 'الاسم أو الشركة *' : 'Your Name / Brand *'}
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder={isAr ? 'مثال: عبد الله آل سعود' : 'e.g. Sarah Jenkins'}
                className={inputBaseClass}
              />
              {errors.name && (
                <p className="font-body-plex text-[11.5px] text-red-400 mt-1.5">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="font-body-plex text-[12.5px] font-semibold text-[#E9DEDE] block mb-1.5">
                {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
              </label>
              <input
                type="email"
                dir="ltr"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="name@company.com"
                className={`${inputBaseClass} ${isAr ? 'text-right placeholder:text-right' : 'text-left'}`}
              />
              {errors.email && (
                <p className="font-body-plex text-[11.5px] text-red-400 mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="font-body-plex text-[12.5px] font-semibold text-[#E9DEDE] block mb-1.5">
                {isAr ? 'الخدمة المطلوبة' : 'Requested Service'}
              </label>
              <div className="relative">
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className={`${inputBaseClass} appearance-none cursor-pointer ${isAr ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
                >
                  {hasCustomServiceOption && (
                    <option value={formState.service} className="bg-[#120b0d] text-white font-body-plex">
                      {formState.service}
                    </option>
                  )}
                  {normalizedServices.map((srv) => (
                    <option
                      key={srv.id}
                      value={srv.label}
                      className="bg-[#120b0d] text-white font-body-plex"
                    >
                      {srv.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-4 h-4 text-[#BDB5B5] pointer-events-none absolute top-1/2 -translate-y-1/2 ${
                    isAr ? 'left-3.5' : 'right-3.5'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="font-body-plex text-[12.5px] font-semibold text-[#E9DEDE] block mb-1.5">
                {isAr ? 'تفاصيل فكرتك أو التحدي *' : 'Project Details / Scope *'}
              </label>
              <textarea
                rows={3}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder={
                  isAr
                    ? 'اكتب نبذة عن مشروعك، الفئة المستهدفة، أو ما تحتاجه في الحملة...'
                    : 'Tell me about your product, audience, timeline or goals...'
                }
                className={`${inputBaseClass} resize-none`}
              />
              {errors.message && (
                <p className="font-body-plex text-[11.5px] text-red-400 mt-1.5">{errors.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 items-start">
              <div>
                <button
                  type="submit"
                  className="w-full min-h-[46px] py-3 px-4 rounded-full bg-[#b81d33] hover:bg-[#dc2626] text-white text-[13.5px] font-body-plex font-semibold transition-[background-color,box-shadow,transform] duration-300 ease-out active:scale-[0.99] shadow-[0_8px_24px_-4px_rgba(184,29,51,0.55)] hover:shadow-[0_10px_28px_-2px_rgba(220,38,38,0.65)] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'إرسال الطلب الآن' : 'Send Inquiry Now'}</span>
                </button>
                <p className="font-body-plex text-[11.5px] text-[#BDB5B5] leading-relaxed text-center mt-1.5 px-1">
                  {isAr
                    ? 'سيفتح تطبيق البريد لديك برسالة جاهزة تتضمن تفاصيلك.'
                    : 'Your email app will open with a ready message containing your details.'}
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full min-h-[46px] py-3 px-4 rounded-full bg-[#161012] hover:bg-[#68101C]/45 border border-white/25 hover:border-[#b81d33] text-white text-[13.5px] font-body-plex font-semibold transition-[background-color,border-color,transform] duration-300 ease-out active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-[#fca5a5]" />
                <span>{isAr ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
