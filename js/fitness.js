/* FITNESS.JS — Running plan + Health checklist (synced) */
const Fitness = (() => {
  let openWk = null;

  function _dayKey() { return 'health_'+new Date().toDateString(); }

  function render() { _renderStats(); _renderPhase(DATA.phase1,'phase1List'); _renderPhase(DATA.phase2,'phase2List'); _renderHealth(); }

  function _renderStats() {
    const {dayNum,phase,runWk}=App.computeStats();
    const done=_countDone();
    document.getElementById('fitnessStats').innerHTML=[
      {lbl:'Run Week',val:runWk,   sub:'of 12',      cls:'sv-g'},
      {lbl:'Phase',   val:phase,   sub:phase===1?'Morning':'AM+PM', cls:'sv-a'},
      {lbl:'Day #',   val:dayNum,  sub:'Since Mar 23',cls:'sv-b'},
      {lbl:'Health',  val:done+'/'+DATA.healthItems.length, sub:'Done today', cls:'sv-p'},
    ].map(s=>`<div class="stat-card"><div class="stat-lbl">${s.lbl}</div>
      <div class="stat-val ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
  }

  function _countDone() {
    return DATA.healthItems.filter((h,i)=>{
      return h.syncKey ? SharedState.get(h.syncKey) : !!(App.STORE.get(_dayKey())||{})[i];
    }).length;
  }

  function _renderPhase(data, cid) {
    const {runWk}=App.computeStats();
    document.getElementById(cid).innerHTML=data.map((r,i)=>{
      const wNum=cid==='phase1List'?i+1:i+7;
      const isCur=wNum===runWk;
      const isOpen=openWk===cid+i;
      return `<div class="run-card${isCur?' cur':''}${isOpen?' open':''}">
        <div class="run-card-head" onclick="Fitness.toggleWk('${cid}',${i})">
          <span class="run-card-title">${r.w}${isCur?' ← Current':''}</span>
          <span class="run-card-focus">${r.focus}</span>
        </div>
        <div class="run-card-body">
          <div class="run-row"><strong>Mon/Wed/Fri:</strong> ${r.mwf}</div>
          <div class="run-row"><strong>Tue/Thu:</strong> ${r.tth}</div>
          <div class="run-row"><strong>Saturday:</strong> ${r.sat}</div>
        </div>
      </div>`;
    }).join('');
  }

  function toggleWk(cid,i) {
    openWk = openWk===cid+i ? null : cid+i;
    _renderPhase(DATA.phase1,'phase1List');
    _renderPhase(DATA.phase2,'phase2List');
  }

  function _renderHealth() {
    const state=App.STORE.get(_dayKey())||{};
    let done=0;
    const html=DATA.healthItems.map((h,i)=>{
      const checked = h.syncKey ? SharedState.get(h.syncKey) : !!state[i];
      if(checked) done++;
      return `<div class="health-item${checked?' done':''}" onclick="Fitness.toggleHealth(${i})">
        <div class="hi-chk">${checked?'✓':''}</div>
        <div>
          <div class="hi-name">${h.name}${h.syncKey?` <span style="font-size:10px;color:var(--green)">🔗</span>`:''}</div>
          <div class="hi-time">⏰ ${h.time}</div>
          <div class="hi-ben">✦ ${h.benefit}</div>
        </div>
      </div>`;
    }).join('');
    document.getElementById('healthChecklist').innerHTML=html;
    _refreshHealthProg(done, DATA.healthItems.length);
  }

  function _refreshHealthProg(done, total) {
    if(done===undefined){ done=_countDone(); total=DATA.healthItems.length; }
    const pct=total?Math.round(done/total*100):0;
    const bar=document.getElementById('healthBar');
    const lbl=document.getElementById('healthProg');
    if(bar) bar.style.width=pct+'%';
    if(lbl) lbl.textContent=done+'/'+total;
  }

  function toggleHealth(i) {
    const h=DATA.healthItems[i];
    if(h.syncKey){
      SharedState.set(h.syncKey, !SharedState.get(h.syncKey));
    } else {
      const state=App.STORE.get(_dayKey())||{};
      state[i]=!state[i];
      App.STORE.set(_dayKey(),state);
      _renderHealth();
      _renderStats();
    }
  }

  function resetHealth() {
    App.STORE.set(_dayKey(), {});
    // Clear synced health keys
    const syncState={};
    localStorage.setItem('sync_'+new Date().toDateString(), JSON.stringify(syncState));
    _renderHealth(); _renderStats();
    try { App._renderChecklist(); } catch(e){}
    try { Habits._renderGrid(); } catch(e){}
    App.showToast('Health checklist reset');
  }

  return {render, toggleWk, toggleHealth, resetHealth, _renderHealth, _refreshHealthProg};
})();
