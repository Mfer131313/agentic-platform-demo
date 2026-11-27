/* Hornalba · rellena el marco de la consola (se carga antes de core.js). */
(function () {
  'use strict';
  const meta = window.CN_DATA.meta;
  const root = document.documentElement;
  root.setAttribute('data-industry', meta.id);
  const t = meta.theme;
  root.style.setProperty('--cn-green', t.brand);
  root.style.setProperty('--cn-green-dark', t.dark);
  root.style.setProperty('--cn-green-900', t.deep);
  root.style.setProperty('--cn-green-50', t.tint);
  function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text || ''; }
  function fill() {
    setText('ws-avatar', meta.short);
    setText('ws-name', meta.company);
    setText('ws-sub', meta.site);
    setText('me-avatar', meta.user_initials);
    setText('me-name', meta.user_role);
    setText('me-sub', meta.user_sub);
    setText('crumb-root', meta.company);
    const clock = document.getElementById('clock');
    if (clock) clock.title = meta.clock_title;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
