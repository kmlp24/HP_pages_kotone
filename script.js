// 年号
document.getElementById('y').textContent = new Date().getFullYear();

// スクロール時のフェードイン
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
},{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
