/* REMINDERS.JS */
const Reminders = (() => {
  const ICONS={study:'📚',fitness:'🏃',health:'🌿',exam:'📝',other:'📌'};
  let editId=null;

  function _all() { return App.STORE.get('reminders')||[]; }
  function _save(a) { App.STORE.set('reminders',a); }

  function render() { _renderList(); _renderUpcoming(); }

  function _renderList() {
    const all=_all();
    const el=document.getElementById('reminderList');
    if(!all.length){ el.innerHTML='<div class="empty-msg">No reminders yet. Tap "+ New" to add.</div>'; return; }
    el.innerHTML=all.map(r=>`
      <div class="rem-card">
        <div class="rem-ico">${ICONS[r.cat]||'📌'}</div>
        <div class="rem-info">
          <div class="rem-title">${r.title}</div>
          <div class="rem-meta">
            <span>⏰ ${r.time}</span>
            <span>🔁 ${r.repeat}</span>
            <span class="cat-badge cat-${r.cat}">${r.cat}</span>
          </div>
          ${r.note?`<div class="rem-note">${r.note}</div>`:''}
        </div>
        <div class="rem-acts">
          <button class="rem-toggle${r.active?' on':''}" onclick="Reminders.toggleActive('${r.id}')"></button>
          <button class="mit-del" onclick="Reminders.edit('${r.id}')">✏️</button>
          <button class="rem-del" onclick="Reminders.del('${r.id}')">×</button>
        </div>
      </div>`).join('');
  }

  function _renderUpcoming() {
    const now=new Date();
    const cur=now.getHours()*60+now.getMinutes();
    const day=now.getDay();
    const up=_all().filter(r=>{
      if(!r.active) return false;
      const [h,m]=r.time.split(':').map(Number);
      const rm=h*60+m;
      if(rm<=cur) return false;
      if(r.repeat==='daily') return true;
      if(r.repeat==='weekdays') return day>=1&&day<=5;
      if(r.repeat==='weekends') return day===0||day===6;
      if(r.repeat==='once') return true;
      return false;
    }).sort((a,b)=>a.time.localeCompare(b.time));
    const el=document.getElementById('upcomingReminders');
    if(!up.length){ el.innerHTML='<div class="empty-msg">No upcoming reminders today.</div>'; return; }
    el.innerHTML=up.map(r=>{
      const [h,m]=r.time.split(':').map(Number);
      const diff=h*60+m-cur;
      const ds=diff<60?`in ${diff}m`:`in ${Math.floor(diff/60)}h ${diff%60}m`;
      return `<div class="rem-card">
        <div class="rem-ico">${ICONS[r.cat]||'📌'}</div>
        <div class="rem-info">
          <div class="rem-title">${r.title}</div>
          <div class="rem-meta"><span>⏰ ${r.time} — ${ds}</span></div>
          ${r.note?`<div class="rem-note">${r.note}</div>`:''}
        </div>
      </div>`;
    }).join('');
  }

  function openAdd() {
    editId=null;
    document.getElementById('remModalTitle').textContent='New Reminder';
    ['remTitle','remNote'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('remTime').value='';
    document.getElementById('remRepeat').value='daily';
    document.getElementById('remCat').value='other';
    document.getElementById('reminderModal').classList.add('open');
    setTimeout(()=>document.getElementById('remTitle').focus(),300);
  }

  function edit(id) {
    const r=_all().find(x=>x.id===id); if(!r) return;
    editId=id;
    document.getElementById('remModalTitle').textContent='Edit Reminder';
    document.getElementById('remTitle').value=r.title;
    document.getElementById('remNote').value=r.note||'';
    document.getElementById('remTime').value=r.time;
    document.getElementById('remRepeat').value=r.repeat;
    document.getElementById('remCat').value=r.cat;
    document.getElementById('reminderModal').classList.add('open');
  }

  function closeAdd() { document.getElementById('reminderModal').classList.remove('open'); editId=null; }

  function save() {
    const title=document.getElementById('remTitle').value.trim();
    const note=document.getElementById('remNote').value.trim();
    const time=document.getElementById('remTime').value;
    const repeat=document.getElementById('remRepeat').value;
    const cat=document.getElementById('remCat').value;
    if(!title||!time) return App.showToast('Title and time are required');
    const all=_all();
    if(editId){
      const idx=all.findIndex(x=>x.id===editId);
      if(idx>=0) all[idx]={...all[idx],title,note,time,repeat,cat};
    } else {
      all.push({id:'r'+Date.now(),title,note,time,repeat,cat,active:true});
    }
    _save(all); closeAdd(); render();
    App.showToast(editId?'Reminder updated ✓':'Reminder added ✓');
  }

  function del(id) {
    _save(_all().filter(x=>x.id!==id)); render(); App.showToast('Deleted');
  }

  function toggleActive(id) {
    const all=_all(); const i=all.findIndex(x=>x.id===id);
    if(i>=0) all[i].active=!all[i].active; _save(all); render();
  }

  function checkNow() {
    const now=new Date();
    const hh=String(now.getHours()).padStart(2,'0');
    const mm=String(now.getMinutes()).padStart(2,'0');
    const t=`${hh}:${mm}`;
    const day=now.getDay();
    _all().filter(r=>r.active&&r.time===t).forEach(r=>{
      let fire=false;
      if(r.repeat==='daily') fire=true;
      else if(r.repeat==='weekdays'&&day>=1&&day<=5) fire=true;
      else if(r.repeat==='weekends'&&(day===0||day===6)) fire=true;
      else if(r.repeat==='once') fire=true;
      if(fire){
        App.showToast('🔔 '+r.title+(r.note?' — '+r.note:''), 5000);
        if('Notification' in window&&Notification.permission==='granted')
          new Notification('NT Life Plan',{body:r.title+(r.note?'\n'+r.note:'')});
        if(r.repeat==='once'){
          const all=_all().map(x=>x.id===r.id?{...x,active:false}:x);
          _save(all);
        }
      }
    });
  }

  return {render,openAdd,edit,closeAdd,save,del,toggleActive,checkNow};
})();
