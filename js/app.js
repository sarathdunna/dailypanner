/* APP.JS — Core: init, routing, clock, SharedState sync */

/* ── SHARED STATE (cross-module sync) ── */
const SharedState = (() => {
  function dayKey() { return 'sync_' + new Date().toDateString(); }
  function getAll() { try { return JSON.parse(localStorage.getItem(dayKey())) || {}; } catch { return {}; } }
  function saveAll(s) { localStorage.setItem(dayKey(), JSON.stringify(s)); }

  function get(k) { return !!getAll()[k]; }

  function set(k, v) {
    const s = getAll();
    s[k] = v;
    saveAll(s);
    _notify();
  }

  function _notify() {
    const active = document.querySelector('.page.active')?.id?.replace('page-', '');
    try {
      if (active === 'today')   App._renderChecklist();
      if (active === 'fitness') Fitness._renderHealth();
      if (active === 'habits')  Habits._renderGrid();
    } catch(e) {}
    // Always update other modules' state silently
    try { if (active !== 'today')   App._refreshTodayProgress(); } catch(e) {}
    try { if (active !== 'fitness') Fitness._refreshHealthProg(); } catch(e) {}
  }

  return { get, set };
})();

const App = (() => {
  /* ── STORE ── */
  const STORE = {
    get: k => { try { return JSON.parse(localStorage.getItem('nt_'+k)); } catch { return null; } },
    set: (k,v) => localStorage.setItem('nt_'+k, JSON.stringify(v)),
  };

  /* ── CLOCK ── */
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    document.getElementById('liveClock').textContent = h+':'+m;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    document.getElementById('headerDate').textContent =
      days[now.getDay()]+', '+now.getDate()+' '+months[now.getMonth()]+' '+now.getFullYear();
    _updateBanner(now);
  }

  /* ── CURRENT TASK BANNER ── */
  function _tMins(str) {
    const m = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return -1;
    let h = +m[1], mn = +m[2];
    if (m[3].toUpperCase()==='PM' && h!==12) h+=12;
    if (m[3].toUpperCase()==='AM' && h===12)  h=0;
    return h*60+mn;
  }

  function _updateBanner(now) {
    const total = now.getHours()*60+now.getMinutes();
    const d = now.getDay();
    let slots = d===6 ? DATA.saturday : d===0 ? DATA.sunday : DATA.monThu;
    let cur=-1;
    for(let i=0;i<slots.length;i++){
      const s=_tMins(slots[i].t);
      const e=i+1<slots.length?_tMins(slots[i+1].t):1440;
      if(total>=s&&total<e){cur=i;break;}
    }
    const tEl=document.getElementById('cbTask');
    const nEl=document.getElementById('cbNext');
    if(cur>=0){
      tEl.textContent=slots[cur].name;
      nEl.textContent=cur+1<slots.length
        ?'Next: '+slots[cur+1].t+' — '+slots[cur+1].name
        :'Next: Rest well 🌙';
    } else {
      tEl.textContent='Outside scheduled hours';
      nEl.textContent='';
    }
  }

  /* ── COMPUTE STATS ── */
  function computeStats() {
    const start = new Date('2025-03-23');
    const dayNum = Math.max(1, Math.floor((new Date()-start)/86400000)+1);
    const phase  = dayNum>45?2:1;
    const runWk  = Math.min(12, Math.ceil(dayNum/7));
    return {dayNum, phase, runWk};
  }

  /* ── TODAY STATS ── */
  function _renderTodayStats() {
    const {dayNum,phase,runWk} = computeStats();
    const slots = _todaySlots();
    const stateKey = _todayKey();
    const state = STORE.get(stateKey)||{};
    let done=0;
    slots.forEach((s,i)=>{ if(s.syncKey?SharedState.get(s.syncKey):!!state[i]) done++; });
    document.getElementById('todayStats').innerHTML=[
      {lbl:'Day #',  val:dayNum, sub:'Since Mar 23', cls:'sv-g'},
      {lbl:'Phase',  val:phase,  sub:phase===1?'Morning Run':'AM+PM', cls:'sv-a'},
      {lbl:'Run Wk', val:runWk,  sub:'of 12', cls:'sv-b'},
      {lbl:'Done',   val:done+'/'+slots.length, sub:'Today', cls:'sv-p'},
    ].map(s=>`<div class="stat-card"><div class="stat-lbl">${s.lbl}</div>
      <div class="stat-val ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
  }

  function _todaySlots() {
    const d=new Date().getDay();
    return d===6?DATA.saturday:d===0?DATA.sunday:DATA.monThu;
  }

  function _todayKey() { return 'today_'+new Date().toDateString(); }

  /* ── RENDER CHECKLIST ── */
  function _renderChecklist() {
    const slots = _todaySlots();
    const stateKey = _todayKey();
    const state = STORE.get(stateKey)||{};
    let done=0;
    const html = slots.map((s,i)=>{
      const checked = s.syncKey ? SharedState.get(s.syncKey) : !!state[i];
      if(checked) done++;
      const catCls = 'cat-'+s.cat;
      const syncBadge = s.syncKey
        ? `<span class="sync-badge">🔗 synced</span>` : '';
      return `<div class="check-item${checked?' done':''}" onclick="App._toggleItem(${i})">
        <div class="ci-box">${checked?'✓':''}</div>
        <div style="flex:1">
          <div class="ci-time">${s.t}${s.d?' · '+s.d:''}</div>
          <div class="ci-name">${s.name}</div>
          <div class="ci-row">
            <span class="cat-badge ${catCls}">${s.cat}</span>
            ${syncBadge}
          </div>
        </div>
      </div>`;
    }).join('');
    document.getElementById('todayChecklist').innerHTML = html;
    _refreshTodayProgress(done, slots.length);
  }

  function _refreshTodayProgress(done, total) {
    if(done===undefined){
      const slots=_todaySlots();
      const state=STORE.get(_todayKey())||{};
      done=0; total=slots.length;
      slots.forEach((s,i)=>{ if(s.syncKey?SharedState.get(s.syncKey):!!state[i]) done++; });
    }
    const pct = total?Math.round(done/total*100):0;
    const el = document.getElementById('todayBar');
    const prog = document.getElementById('todayProgress');
    if(el) el.style.width = pct+'%';
    if(prog) prog.textContent = done+'/'+total;
    // Update stat card
    const statEl = document.querySelector('#todayStats .stat-card:last-child .stat-val');
    if(statEl) statEl.textContent = done+'/'+total;
  }

  function _toggleItem(idx) {
    const slots = _todaySlots();
    const slot  = slots[idx];
    const stateKey = _todayKey();
    if(slot.syncKey){
      SharedState.set(slot.syncKey, !SharedState.get(slot.syncKey));
    } else {
      const state = STORE.get(stateKey)||{};
      state[idx] = !state[idx];
      STORE.set(stateKey, state);
      _renderChecklist();
      _renderTodayStats();
    }
  }

  function resetToday() {
    STORE.set(_todayKey(), {});
    // Also clear synced items for today
    const s = {};
    localStorage.setItem('sync_'+new Date().toDateString(), JSON.stringify(s));
    _renderChecklist();
    _renderTodayStats();
    showToast('Today checklist reset');
    // Re-render other modules if open
    try { Fitness._renderHealth(); } catch(e){}
    try { Habits._renderGrid(); } catch(e){}
  }

  /* ── SUBTITLE ── */
  function _renderSubtitle() {
    const d=new Date().getDay();
    const labels=['Sunday — Recovery + Mock','Monday — College Day','Tuesday — College Day',
      'Wednesday — College Day','Thursday — College Day','Friday — Catchup Day','Saturday — Max Study Day'];
    document.getElementById('todaySubtitle').textContent=labels[d];
  }

  /* ── THEME ── */
  function _loadTheme() {
    const t=STORE.get('theme')||'light';
    document.documentElement.setAttribute('data-theme',t);
    document.getElementById('themeIcon').textContent=t==='dark'?'☀️':'🌙';
  }

  function _toggleTheme() {
    const cur=document.documentElement.getAttribute('data-theme');
    const next=cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    document.getElementById('themeIcon').textContent=next==='dark'?'☀️':'🌙';
    STORE.set('theme',next);
  }

  /* ── NAVIGATION ── */
  function goTo(id, btn) {
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('page-'+id).classList.add('active');
    if(btn) btn.classList.add('active');
    // Lazy render
    const map={habits:()=>Habits.render(),fitness:()=>Fitness.render(),
      calendar:()=>Cal.render(),exams:()=>Exams.render(),
      reminders:()=>Reminders.render()};
    if(map[id]) map[id]();
  }

  /* ── TOAST ── */
  function showToast(msg, dur=2000) {
    const t=document.getElementById('toast');
    t.textContent=msg; t.classList.add('show');
    clearTimeout(t._tid);
    t._tid=setTimeout(()=>t.classList.remove('show'), dur);
  }

  /* ── INIT ── */
  function init() {
    _loadTheme();
    document.getElementById('themeToggle').addEventListener('click',_toggleTheme);
    document.getElementById('mitInput').addEventListener('keydown',e=>{if(e.key==='Enter')Habits.addMIT();});
    document.getElementById('aiInput').addEventListener('keydown',e=>{if(e.key==='Enter')AI.send();});

    tick();
    setInterval(tick, 15000);
    setInterval(Reminders.checkNow, 30000);

    _renderSubtitle();
    _renderTodayStats();
    _renderChecklist();
    Habits.render();
    Cal.render();
  }

  return {
    init, goTo, computeStats, showToast, STORE,
    _renderChecklist, _renderTodayStats, _refreshTodayProgress,
    _toggleItem, resetToday, _tMins,
  };
})();
