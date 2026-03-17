/* HABITS.JS — Habit tracker synced with Today & Fitness */
const Habits = (() => {
  const todayIdx = () => new Date().getDay(); // 0=Sun … 6=Sat

  function _getState() { return App.STORE.get('habitState') || DATA.habits.map(()=>Array(7).fill(false)); }
  function _setState(s) { App.STORE.set('habitState',s); }
  function _getMITs() { return App.STORE.get('mitTasks')||[]; }

  function render() { _renderStats(); _renderGrid(); _renderMIT(); }

  function _renderStats() {
    const state=_getState();
    const mits=_getMITs();
    const total=state.reduce((s,r)=>s+r.filter(Boolean).length,0);
    const streak=_streak(state[0]);
    const mDone=mits.filter(t=>t.done).length;
    document.getElementById('habitStats').innerHTML=[
      {lbl:'Run Streak', val:streak,        sub:'days',      cls:'sv-g'},
      {lbl:'Week Done',  val:total,          sub:'totals',    cls:'sv-b'},
      {lbl:'MIT Done',   val:mDone+'/'+mits.length, sub:'today', cls:'sv-a'},
    ].map(s=>`<div class="stat-card"><div class="stat-lbl">${s.lbl}</div>
      <div class="stat-val ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
    const mits2=_getMITs();
    document.getElementById('mitBadge').textContent=mits2.filter(t=>t.done).length+'/'+mits2.length;
  }

  function _streak(row) {
    let s=0;
    for(let i=row.length-1;i>=0;i--){ if(row[i]) s++; else break; }
    return s;
  }

  function _renderGrid() {
    const state=_getState();
    const ti=todayIdx();
    document.getElementById('habitGrid').innerHTML=DATA.habits.map((h,hi)=>{
      const streak=_streak(state[hi]);
      const dots=DATA.days7.map((d,di)=>{
        // For today's column, if habit has syncKey, read from SharedState
        const checked = (di===ti && h.syncKey) ? SharedState.get(h.syncKey) : state[hi][di];
        const isToday = di===ti;
        return `<div class="hd-wrap">
          <div class="hd ${checked?h.color:''} ${isToday?'today-col':''}"
               onclick="Habits.toggleDot(${hi},${di})"
               title="${d}"></div>
          <span class="hd-lbl">${d}</span>
        </div>`;
      }).join('');
      return `<div class="habit-card">
        <div class="habit-card-head">
          <span class="habit-card-name">${h.name}${h.syncKey?` <span style="font-size:10px;color:var(--green)">🔗</span>`:''}</span>
          <span class="habit-streak">🔥 ${streak} streak</span>
        </div>
        <div class="habit-dots-row">${dots}</div>
      </div>`;
    }).join('');
  }

  function toggleDot(hi,di) {
    const state=_getState();
    const habit=DATA.habits[hi];
    const ti=todayIdx();
    const newVal = !( (di===ti && habit.syncKey) ? SharedState.get(habit.syncKey) : state[hi][di] );

    // Update local state
    state[hi][di]=newVal;
    _setState(state);

    // If toggling today's column with a syncKey, update SharedState
    if(di===ti && habit.syncKey){
      SharedState.set(habit.syncKey, newVal);
    } else {
      _renderGrid();
      _renderStats();
    }
  }

  function _renderMIT() {
    const mits=_getMITs();
    const el=document.getElementById('mitList');
    if(!mits.length){ el.innerHTML='<div class="empty-msg">Add up to 5 most important tasks for today.</div>'; return; }
    el.innerHTML=mits.map((t,i)=>`
      <div class="mit-item">
        <div class="mit-chk${t.done?' on':''}" onclick="Habits.toggleMIT(${i})">${t.done?'✓':''}</div>
        <span class="mit-txt${t.done?' done':''}">${t.text}</span>
        <button class="mit-del" onclick="Habits.delMIT(${i})">×</button>
      </div>`).join('');
  }

  function addMIT() {
    const inp=document.getElementById('mitInput');
    const text=inp.value.trim();
    if(!text) return;
    const mits=_getMITs();
    if(mits.length>=5) return App.showToast('Max 5 MIT tasks');
    mits.push({text,done:false});
    App.STORE.set('mitTasks',mits);
    inp.value='';
    _renderMIT(); _renderStats();
  }

  function toggleMIT(i) {
    const m=_getMITs(); m[i].done=!m[i].done; App.STORE.set('mitTasks',m);
    _renderMIT(); _renderStats();
  }

  function delMIT(i) {
    const m=_getMITs(); m.splice(i,1); App.STORE.set('mitTasks',m);
    _renderMIT(); _renderStats();
  }

  function reset() {
    App.STORE.set('habitState', DATA.habits.map(()=>Array(7).fill(false)));
    render(); App.showToast('Week reset');
  }

  return {render, toggleDot, addMIT, toggleMIT, delMIT, reset, _renderGrid};
})();
