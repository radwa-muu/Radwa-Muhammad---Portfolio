export function scrollToSectionId(targetId: string) {
  const cleanId = targetId.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  const navbarEl = document.getElementById('navbar');
  const navHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 74;
  const offset = Math.max(64, Math.round(navHeight + 8));
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
