<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Taskio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet">
<style>
:root{--bg:#f9f9f9;--surf:#fff;--tx:#1e1e1e;--mut:#6b7078;--top:#cdd0d5;--chip:#f3f3f4;--chipb:#b5b8be;--line:#444;--shadow:rgba(0,0,0,.18);color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#17181b;--surf:#222428;--tx:#ececee;--mut:#9a9ea6;--top:#2c2f35;--chip:#2b2d32;--chipb:#4a4d55;--line:#8a8d95;--shadow:rgba(0,0,0,.5);color-scheme:dark}}
:root[data-theme="dark"]{--bg:#17181b;--surf:#222428;--tx:#ececee;--mut:#9a9ea6;--top:#2c2f35;--chip:#2b2d32;--chipb:#4a4d55;--line:#8a8d95;--shadow:rgba(0,0,0,.5);color-scheme:dark}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--tx);font:14px/1.4 Inter,system-ui,sans-serif}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0}
button:focus-visible,input:focus-visible{outline:2px solid #4a86d8;outline-offset:2px}
header{background:var(--top);height:81px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,3vw,35px)}
.logo{font:500 36px 'Roboto Slab',serif;display:flex;align-items:center;gap:8px}
.logo button{display:flex}
header svg{width:26px;height:26px;stroke:var(--tx);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
main{max-width:1440px;margin:0 auto;padding:36px clamp(16px,2vw,27px) 48px}
.goals{background:var(--surf);border:2px solid var(--line);border-radius:12px;box-shadow:0 4px 15px var(--shadow);padding:14px 18px 18px;margin-bottom:36px}
.goals h2{margin:0 0 12px;font:400 18px 'Roboto Mono',monospace;display:flex;align-items:center;gap:8px}
.goals h2 svg{width:20px;height:20px;stroke:var(--tx);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.chips{display:flex;flex-wrap:wrap;gap:14px}
.chip{display:flex;align-items:center;gap:10px;background:var(--chip);border:1px solid var(--chipb);border-radius:30px;height:42px;padding:0 14px;min-width:260px;font:400 16px 'Roboto Mono',monospace}
.chip .t{flex:1}
.chip.done .t{text-decoration:line-through;color:var(--mut)}
.star{font-size:22px;line-height:1;color:var(--chipb)}
.chip.done .star{color:#f2b01e}
.x{color:var(--mut);font-size:18px;line-height:1;opacity:.5}
.chip:hover .x,.task:hover .x,.x:focus-visible{opacity:1}
.chip input{border:0;background:none;color:inherit;font:inherit;width:100%;outline-offset:6px}
.chip.add{border-style:dashed}
.week{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.day{--c:#888;background:color-mix(in srgb,var(--c) 13%,var(--surf));border:1.5px solid color-mix(in srgb,var(--c) 38%,transparent);border-radius:18px;padding:16px 16px 14px;min-height:300px;display:flex;flex-direction:column;box-shadow:0 4px 15px color-mix(in srgb,var(--shadow) 45%,transparent)}
.head{display:flex;justify-content:space-between;align-items:flex-start}
.wd{color:var(--c);font-weight:700;letter-spacing:.12em;font-size:12px;text-transform:uppercase}
.num{font-size:30px;font-weight:700;line-height:1.1}
.mo{color:var(--c);font-size:13px}
.badge{background:#4a86d8;color:#fff;font-size:11px;font-weight:600;border-radius:99px;padding:3px 10px}
.day.today{box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 30%,transparent),0 4px 15px color-mix(in srgb,var(--shadow) 45%,transparent)}
.meta{display:flex;justify-content:space-between;color:var(--c);font-size:12px;margin:14px 0 5px}
.pr{height:5px;border-radius:9px;background:color-mix(in srgb,var(--c) 16%,var(--surf));overflow:hidden}
.pr i{display:block;height:100%;background:var(--c);border-radius:9px;transition:width .3s}
ul{list-style:none;margin:12px 0;padding:0;display:flex;flex-direction:column;gap:7px;flex:1}
.task{display:flex;align-items:center;gap:9px;background:var(--surf);border:1px solid color-mix(in srgb,var(--c) 25%,transparent);border-radius:10px;padding:8px 10px}
.task .t{flex:1;word-break:break-word}
.task.done .t{text-decoration:line-through;color:var(--mut)}
.ck{width:18px;height:18px;border-radius:6px;border:2px solid var(--c);flex:none;display:grid;place-items:center;color:#fff;font-size:12px;line-height:1}
.done .ck{background:var(--c)}
.empty{color:var(--mut);font-size:13px;padding:6px 2px}
.new{width:100%;border:1px dashed color-mix(in srgb,var(--c) 55%,transparent);background:transparent;color:var(--tx);border-radius:10px;padding:8px 10px;font:inherit}
.new::placeholder{color:var(--c);opacity:.85}
@media(max-width:1000px){.week{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.week{grid-template-columns:1fr}.chip{min-width:100%}.logo{font-size:30px}}
</style>
</head>
<body>
<header>
  <div class="logo">Taskio <button id="theme" aria-label="Alternar tema claro e escuro"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4-4-7-9-7Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></svg></button></div>
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
</header>
<main>
  <section class="goals" id="goals"></section>
  <section class="week" id="week" aria-label="Tarefas por dia"></section>
</main>
<script>
const K='taski-v1';let S=null;
try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=S||{goals:[{t:'Beber água',d:0},{t:'Estudar',d:0}],tasks:{}};
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const key=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const cols=['#8b7be0','#4fae82','#ee9650','#4a86d8','#e0709f','#43819c','#7fba55','#c06fd0'];
const now=new Date(),off=(now.getDay()+6)%7;
const days=[...Array(8)].map((_,i)=>new Date(now.getFullYear(),now.getMonth(),now.getDate()-off+i));
const wdF=new Intl.DateTimeFormat('pt-BR',{weekday:'short'}),moF=new Intl.DateTimeFormat('pt-BR',{month:'short'});
let focusKey=null;

function render(){
  const g=document.getElementById('goals');
  g.innerHTML='<h2><svg viewBox="0 0 24 24"><path d="m15 4 5 5-3 1-3 3 .5 4-1.5 1.5-3.5-3.5L5 20l-1-1 4.5-4.5L5 11l1.5-1.5 4 .5 3-3z"/></svg>Metas da semana</h2><div class="chips">'+
    S.goals.map((o,i)=>`<div class="chip ${o.d?'done':''}"><button class="star" data-a="tg" data-i="${i}" aria-label="Marcar meta">★</button><span class="t">${esc(o.t)}</span><button class="x" data-a="dg" data-i="${i}" aria-label="Excluir meta">×</button></div>`).join('')+
    '<div class="chip add"><input data-add="goal" placeholder="+ Nova meta" maxlength="60" aria-label="Nova meta"></div></div>';
  document.getElementById('week').innerHTML=days.map((d,i)=>{
    const k=key(d),L=S.tasks[k]||[],n=L.filter(t=>t.d).length,today=k===key(now);
    return `<article class="day ${today?'today':''}" style="--c:${cols[i]}"><div class="head"><div><div class="wd">${wdF.format(d).replace('.','')}</div><div class="num">${d.getDate()}</div><div class="mo">${moF.format(d).replace('.','')}</div></div>${today?'<span class="badge">Hoje</span>':''}</div>
    <div class="meta"><span>Tarefas</span><span>${n}/${L.length}</span></div><div class="pr"><i style="width:${L.length?n/L.length*100:0}%"></i></div>
    <ul>${L.length?L.map((t,j)=>`<li class="task ${t.d?'done':''}"><button class="ck" data-a="tt" data-k="${k}" data-i="${j}" aria-label="Concluir tarefa">${t.d?'✓':''}</button><span class="t">${esc(t.t)}</span><button class="x" data-a="dt" data-k="${k}" data-i="${j}" aria-label="Excluir tarefa">×</button></li>`).join(''):'<li class="empty">Nenhuma tarefa neste dia.</li>'}</ul>
    <input class="new" data-add="${k}" placeholder="+ Adicionar tarefa" maxlength="80" aria-label="Nova tarefa em ${k}"></article>`}).join('');
  if(focusKey){const el=document.querySelector(`[data-add="${focusKey}"]`);if(el)el.focus();focusKey=null}
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;
  const{a,i,k}=b.dataset;
  if(a==='tg')S.goals[i].d^=1;
  if(a==='dg')S.goals.splice(i,1);
  if(a==='tt')S.tasks[k][i].d^=1;
  if(a==='dt')S.tasks[k].splice(i,1);
  save();render();
});
document.addEventListener('keydown',e=>{
  const el=e.target;if(e.key!=='Enter'||!el.dataset||!el.dataset.add)return;
  const v=el.value.trim();if(!v)return;
  if(el.dataset.add==='goal')S.goals.push({t:v,d:0});
  else(S.tasks[el.dataset.add]=S.tasks[el.dataset.add]||[]).push({t:v,d:0});
  focusKey=el.dataset.add;save();render();
});
document.getElementById('theme').addEventListener('click',()=>{
  const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme=dark?'light':'dark';
});
render();
</script>
</body>
</html>