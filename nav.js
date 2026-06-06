// nav.js — adds an accessible hamburger menu to the site header on small screens.
// Works on any page whose header has `.wrap.nav > .nav-links` + `.top-actions`.
(function () {
  function init() {
    const header = document.querySelector('header');
    if (!header) return;
    const nav = header.querySelector('.nav');
    const links = header.querySelector('.nav-links');
    const actions = header.querySelector('.top-actions') || nav;
    if (!nav || !links || nav.querySelector('.nav-toggle')) return;

    if (!links.id) links.id = 'site-nav-links';

    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-controls', links.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    actions.appendChild(btn);

    function setOpen(open) {
      header.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    const close = () => setOpen(false);

    btn.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
