/* =============================================
   FITNESS.JS — Running plan + Health checklist
   ============================================= */

const Fitness = (() => {

  let openWeek = null;

  function getHealthState() {
    const key = 'health_' + new Date().toDateString();
    return App.STORE.get(key) || Array(DATA.healthItems.length).fill(false);
  }
  function setHealthState(state) {
    const key = 'health_' + new Date().toDateString();
    App.STORE.set(key, state);
  }

  function render() {
    renderStats();
    renderPhase(DATA.phase1, 'phase1List');
    renderPhase(DATA.phase2, 'phase2List');
    renderHealthChecklist();
  }

  function renderStats() {
    const { dayNum, phase, runWk } = App.computeStats();
    const healthDone = getHealthState().filter(Boolean).length;
    document.getElementById('fitnessStats').innerHTML = [
      { label:'Run Week', val:runWk,    sub:'of 12',         cls:'sv-green' },
      { label:'Phase',    val:phase,    sub:phase===1?'Morning':'AM + PM', cls:'sv-amber' },
      { label:'Day #',    val:dayNum,   sub:'Since Mar 23',  cls:'sv-blue' },
      { label:'Health',   val:healthDone+'/8', sub:'Done today', cls:'sv-purple' },
    ].map(s => `<div class="stat-card"><div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
  }

  function renderPhase(data, containerId) {
    const { runWk } = App.computeStats();
    document.getElementById(containerId).innerHTML = data.map((r, i) => {
      const wNum = containerId === 'phase1List' ? i + 1 : i + 7;
      const isCurrent = wNum === runWk;
      const isOpen = openWeek === containerId + i;
      return `<div class="run-week-card ${isCurrent ? 'active-week' : ''} ${isOpen ? 'open' : ''}">
        <div class="run-week-header" onclick="Fitness.toggleWeek('${containerId}',${i})">
          <div>
            <div class="run-week-title">${r.w} ${isCurrent ? '← Current' : ''}</div>
          </div>
          <span class="run-week-focus">${r.focus}</span>
        </div>
        <div class="run-week-body">
          <div class="run-day-row"><strong>Mon/Wed/Fri:</strong> ${r.mwf}</div>
          <div class="run-day-row"><strong>Tue/Thu:</strong> ${r.tth}</div>
          <div class="run-day-row"><strong>Saturday:</strong> ${r.sat}</div>
        </div>
      </div>`;
    }).join('');
  }

  function toggleWeek(cid, i) {
    const key = cid + i;
    openWeek = openWeek === key ? null : key;
    renderPhase(DATA.phase1, 'phase1List');
    renderPhase(DATA.phase2, 'phase2List');
  }

  function renderHealthChecklist() {
    const state = getHealthState();
    document.getElementById('healthChecklist').innerHTML = DATA.healthItems.map((h, i) =>
      `<div class="health-item ${state[i] ? 'done' : ''}" onclick="Fitness.toggleHealth(${i})">
        <div class="hi-check">${state[i] ? '✓' : ''}</div>
        <div>
          <div class="hi-name">${h.name}</div>
          <div class="hi-time">⏰ ${h.time}</div>
          <div class="hi-benefit">✦ ${h.benefit}</div>
        </div>
      </div>`
    ).join('');
  }

  function toggleHealth(i) {
    const state = getHealthState();
    state[i] = !state[i];
    setHealthState(state);
    renderHealthChecklist();
    renderStats();
  }

  function resetHealth() {
    setHealthState(Array(DATA.healthItems.length).fill(false));
    renderHealthChecklist();
    renderStats();
    App.showToast('Health checklist reset');
  }

  return { render, toggleWeek, toggleHealth, resetHealth };

})();
