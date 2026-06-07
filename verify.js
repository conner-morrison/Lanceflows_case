// verify.js — lightweight "are you human?" gate shown once per browser session.
// Self-contained: injects its own styles + overlay. Include early in <body>.
// NOTE: this is a client-side UX gate (deters casual bots); it is NOT a
// substitute for real edge/CAPTCHA bot protection.
(function () {
  var KEY = 'lf_human_verified';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var css =
  '.vh-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;' +
    "background:linear-gradient(125deg,#0a1736,#123178 46%,#0e5f93 72%,#0b8f87);font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;opacity:1;transition:opacity .45s ease}" +
  '.vh-overlay.vh-hide{opacity:0;pointer-events:none}' +
  '.vh-card{width:100%;max-width:420px;background:#fff;border-radius:20px;padding:34px 30px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.55)}' +
  '.vh-logo{height:46px;width:auto;margin:0 auto 18px;display:block}' +
  '.vh-card h2{font-size:1.35rem;color:#0e1c3a;margin:0 0 8px;font-weight:800}' +
  '.vh-card p{color:#46557a;font-size:.95rem;margin:0 0 24px;line-height:1.55}' +
  '.vh-box{display:flex;align-items:center;gap:14px;width:100%;border:1px solid #cdd9ee;border-radius:14px;padding:16px 18px;background:#f7faff;cursor:pointer;transition:border-color .2s,background .2s;font:inherit;text-align:left}' +
  '.vh-box:hover{border-color:#06b6de}' +
  '.vh-box:focus-visible{outline:2px solid #2563ff;outline-offset:2px}' +
  '.vh-tick{width:28px;height:28px;border-radius:7px;border:2px solid #9aa6c2;flex:none;display:grid;place-items:center;background:#fff;transition:.2s;position:relative}' +
  '.vh-label{font-weight:700;color:#0e1c3a;font-size:1rem}' +
  '.vh-box.is-verifying .vh-tick{border-color:#2563ff}' +
  '.vh-box.is-verifying .vh-spin{display:block}' +
  '.vh-spin{display:none;width:18px;height:18px;border:2px solid rgba(37,99,255,.3);border-top-color:#2563ff;border-radius:50%;animation:vh-rot .7s linear infinite}' +
  '@keyframes vh-rot{to{transform:rotate(360deg)}}' +
  '.vh-box.is-done{border-color:#1f9d57;background:#f0fbf5}' +
  '.vh-box.is-done .vh-tick{border-color:#1f9d57;background:#1f9d57}' +
  '.vh-box.is-done .vh-check{opacity:1;transform:scale(1)}' +
  '.vh-check{position:absolute;color:#fff;font-size:.95rem;font-weight:900;opacity:0;transform:scale(.4);transition:.2s;line-height:1}' +
  '.vh-foot{margin-top:18px;font-size:.78rem;color:#9aa6c2}' +
  '@media(prefers-reduced-motion:reduce){.vh-overlay,.vh-spin{transition:none;animation:none}}';

  var style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  var ov = document.createElement('div');
  ov.className = 'vh-overlay';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Human verification');
  ov.innerHTML =
    '<div class="vh-card">' +
      '<img class="vh-logo" src="company_logo.png" alt="Lanceflows">' +
      '<h2>Quick check</h2>' +
      '<p>Confirm you’re human to continue to Lanceflows.</p>' +
      '<button type="button" class="vh-box" aria-label="Verify you are human">' +
        '<span class="vh-tick"><span class="vh-spin"></span><span class="vh-check">✓</span></span>' +
        '<span class="vh-label">I’m human</span>' +
      '</button>' +
      '<div class="vh-foot">Protected by a basic human check</div>' +
    '</div>';

  function mount() {
    (document.body || document.documentElement).appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    var box = ov.querySelector('.vh-box');
    var label = box.querySelector('.vh-label');
    try { box.focus(); } catch (e) {}

    var done = false;
    box.addEventListener('click', function () {
      if (done) return;
      done = true;
      box.classList.add('is-verifying');
      label.textContent = 'Verifying…';
      setTimeout(function () {
        box.classList.remove('is-verifying');
        box.classList.add('is-done');
        label.textContent = 'Verified';
        setTimeout(function () {
          ov.classList.add('vh-hide');
          document.documentElement.style.overflow = '';
          try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
          setTimeout(function () { ov.remove(); style.remove(); }, 500);
        }, 550);
      }, 800);
    });
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
