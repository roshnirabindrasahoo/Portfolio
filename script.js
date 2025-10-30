
// Theme: default light, toggle persists
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  root.classList.toggle('dark', saved === 'dark');
  const btn = document.getElementById('themeToggle');
  btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    btn.textContent = dark ? '☀️' : '🌙';
  });
})();

// Navbar shrink on scroll
(function(){const nav=document.querySelector('.navbar');window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>10)});})();

// Smooth scroll inertia
(()=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.38/bundled/lenis.min.js';
s.onload=()=>{const lenis=new Lenis({lerp:.08});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf)};document.body.appendChild(s)})();

// GSAP scroll reveals
(()=>{const gs='https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', st='https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
function load(u){return new Promise(r=>{const s=document.createElement('script');s.src=u;s.onload=r;document.body.appendChild(s)})}
;(async()=>{await load(gs);await load(st);gsap.registerPlugin(ScrollTrigger);
gsap.from('.hero h1',{opacity:0,y:20,duration:.8,ease:'power3.out'});
gsap.from('.tagline',{opacity:0,y:16,delay:.1,duration:.8,ease:'power3.out'});
gsap.from('.photo-frame',{opacity:0,scale:.9,delay:.15,duration:.8,ease:'power3.out'});
document.querySelectorAll('.reveal').forEach(el=>{gsap.from(el,{opacity:0,y:24,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}})});
})()})();

// VanillaTilt for subtle parallax
(()=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js';
s.onload=()=>{document.querySelectorAll('.tilt').forEach(el=>{VanillaTilt.init(el,{max:8,speed:400,glare:true,'max-glare':.12})})};document.body.appendChild(s)})();

// Full hero canvas animation (neutral tech particles) + full coverage fix
(function(){
  const c=document.getElementById('heroCanvas'); if(!c) return;
  const ctx=c.getContext('2d'); let w,h,particles=[]; const DPR=window.devicePixelRatio||1;
  function sizeToSection(){
    const sec=document.getElementById('hero');
    const rect=sec.getBoundingClientRect();
    c.style.position='absolute'; c.style.inset='0'; c.style.width='100%'; c.style.height='100%';
    c.width = Math.max(1, rect.width * DPR); c.height = Math.max(1, rect.height * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0); w=rect.width; h=rect.height;
  }
  const ro=new ResizeObserver(sizeToSection); ro.observe(document.getElementById('hero')); sizeToSection();
  const COUNT=130, COLORS=['#0ea5e9','#22d3ee','#93c5fd','#cfe8ff'];
  function reset(){particles=[];for(let i=0;i<COUNT;i++){particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2+0.6,c:COLORS[i%COLORS.length]})}}
  reset();
  let mx=-1e3,my=-1e3;c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
  function step(){
    ctx.clearRect(0,0,w,h);
    const g=ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'rgba(2,6,23,.04)'); g.addColorStop(1,'rgba(2,6,23,.08)');
    ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    for(const p of particles){
      const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy)||1; if(d<120){p.vx+=dx/d*0.02;p.vy+=dy/d*0.02}
      p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.c; ctx.globalAlpha=.85; ctx.fill(); ctx.globalAlpha=1;
    }
    requestAnimationFrame(step);
  }
  step();
})();

// Read More toggles (long content)
(function(){document.querySelectorAll('.read-toggle').forEach(btn=>{btn.addEventListener('click',()=>{const body=btn.closest('.readmore').querySelector('.read-body');body.classList.toggle('open');btn.textContent=body.classList.contains('open')?'Show less':'Read more';});});})();

// Back to top
(function(){const b=document.getElementById('backTop');window.addEventListener('scroll',()=>{b.classList.toggle('show',window.scrollY>300)});b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));})();

// Glow pointer on hero image
(function(){const glow=document.querySelector('.photo-glow');if(!glow)return;glow.parentElement.addEventListener('pointermove',e=>{glow.style.setProperty('--mx',e.offsetX+'px')});})();
