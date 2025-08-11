// 年号
document.getElementById('y').textContent = new Date().getFullYear();

// スクロール時のフェードイン
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
},{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// === Gallery Lightbox（SPのみ起動）===
(() => {
  // 多重初期化防止
  if (window.__galleryLBInited) return;
  window.__galleryLBInited = true;

  // CSSと合わせる：SPは 900px 以下
  const mq = window.matchMedia('(max-width: 900px)');

  const lb = document.getElementById('gallery-lightbox');
  if (!lb) return;

  const imgEl = lb.querySelector('.lightbox__img');
  const capEl = lb.querySelector('.lightbox__cap');

  function openLB(src, alt, cap) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    capEl.textContent = cap || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // imgEl.removeAttribute('src'); // 必要なら有効化
  }

  // サムネクリック（SPのみ）
  document.addEventListener('click', (e) => {
    const fig = e.target.closest('#gallery .gallery figure');
    if (!fig || !mq.matches) return;
    const img = fig.querySelector('img');
    if (!img) return;
    const cap = fig.querySelector('figcaption')?.textContent || '';
    openLB(img.src, img.alt, cap);
  });

  // ×ボタン・背景クリックで閉じる
  lb.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeLB();
  });

  // Escで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLB();
  });

  // 画面幅がPCに変わったら自動で閉じる
  if (mq.addEventListener) {
    mq.addEventListener('change', (e) => { if (!e.matches) closeLB(); });
  } else {
    mq.addListener((e) => { if (!e.matches) closeLB(); }); // 古いブラウザ
  }
})();