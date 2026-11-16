/**
 * Pure helper logic for Radwa Muhammad's Content Marketing Portfolio
 */

export function parseDuration(durationStr: string): number {
  if (!durationStr || typeof durationStr !== 'string') return 0;
  const parts = durationStr.trim().split(':');
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0;
    const secs = parseInt(parts[1], 10) || 0;
    return mins * 60 + secs;
  }
  return 0;
}

export function formatSeconds(totalSecs: number): string {
  const safe = Math.max(0, Math.floor(totalSecs || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function calculateProgress(currentSecs: number, totalSecs: number): number {
  if (!totalSecs || totalSecs <= 0) return 0;
  const ratio = Math.max(0, Math.min(1, currentSecs / totalSecs));
  return Math.round(ratio * 100);
}

export function getDirection(lang: 'ar' | 'en'): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export interface InquiryFormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof InquiryFormState, string>>;
}

export function validateInquiry(formData: InquiryFormState, lang: 'ar' | 'en' = 'ar'): ValidationResult {
  const errors: Partial<Record<keyof InquiryFormState, string>> = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = lang === 'ar' ? 'يرجى إدخال اسم صحيح (حرفين على الأقل)' : 'Please enter a valid name (at least 2 letters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    errors.email = lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address';
  }

  if (!formData.message || formData.message.trim().length < 5) {
    errors.message = lang === 'ar' ? 'يرجى كتابة تفاصيل مشروعك (5 أحرف على الأقل)' : 'Please provide some project details (at least 5 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function filterProjects<T extends { titleAr: string; titleEn: string; category?: string; brand?: string }>(
  items: T[],
  query: string
): T[] {
  if (!query || !query.trim()) return items;
  const normalized = query.toLowerCase().trim();
  return items.filter(item => {
    return (
      item.titleAr.toLowerCase().includes(normalized) ||
      item.titleEn.toLowerCase().includes(normalized) ||
      (item.category && item.category.toLowerCase().includes(normalized)) ||
      (item.brand && item.brand.toLowerCase().includes(normalized))
    );
  });
}

export function normalizeExternalUrl(rawUrl: string): string {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^mailto:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

