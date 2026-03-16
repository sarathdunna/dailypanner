/* =============================================
   HABITS.JS — Habit tracker + MIT tasks
   ============================================= */

const Habits = (() => {

  function getHabitState() {
    return App.STORE.get('habitState') || DATA.habits.map(() => Array(7).fill(false));
  }
  function getMITs() {
    return App.STORE.get('mitTasks') || [];
  }

  function render() {
    renderStats();
    renderGrid();
    renderMIT();
  }

  function renderStats() {
    const state = getHabitState();
    const mits  = getMITs();
    const totalDone = state.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
    const runStreak = calcStreak(state[0]);
    const mitDone   = mits.filter(t => t.done).length;

    document.getElementById('habitStats').innerHTML = [
      { label:'Run Streak', val:runStreak, sub:'days',        cls:'sv-green' },
      { label:'Total Week',  val:totalDone, sub:'completions', cls:'sv-blue' },
      { label:'MIT Done',    val:mitDone+'/'+mits.length, sub:'today', cls:'sv-amber' },
    ].map(s => `<div class="stat-card"><div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');

    document.getElementById('mitBadge').textContent = mitDone + '/' + mits.length;
  }

  function calcStreak(row) {
    let streak = 0;
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i]) streak++; else break;
    }
    return streak;
  }

  function renderGrid() {
    const state = getHabitState();
    const dayLabels = DATA.days7;
    document.getElementById('habitGrid').innerHTML = DATA.habits.map((h, hi) => {
      const streak = calcStreak(state[hi]);
      const dotsHtml = dayLabels.map((d, di) =>
        `<div class="habit-dot-wrap">
          <div class="habit-dot ${state[hi][di] ? 'done ' + h.color : ''}"
               onclick="Habits.toggleDot(${hi},${di})" title="${d}"></div>
          <span class="habit-day-label">${d}</span>
        </div>`
      ).join('');
      return `<div class="habit-row-card">
        <div class="habit-row-header">
          <span class="habit-row-name">${h.name}</span>
          <span class="habit-row-streak">🔥 ${streak} day streak</span>
        </div>
        <div class="habit-dots">${dotsHtml}</div>
      </div>`;
    }).join('');
  }

  function toggleDot(hi, di) {
    const state = getHabitState();
    state[hi][di] = !state[hi][di];
    App.STORE.set('habitState', state);
    render();
  }

  function renderMIT() {
    const mits = getMITs();
    const el = document.getElementById('mitList');
    if (mits.length === 0) {
      el.innerHTML = '<div class="empty-state">Add up to 5 most important tasks for today.</div>';
      return;
    }
    el.innerHTML = mits.map((t, i) =>
      `<div class="mit-item">
        <div class="mit-check ${t.done ? 'done' : ''}" onclick="Habits.toggleMIT(${i})">${t.done ? '✓' : ''}</div>
        <span class="mit-text ${t.done ? 'done' : ''}">${t.text}</span>
        <button class="mit-del" onclick="Habits.deleteMIT(${i})">×</button>
      </div>`
    ).join('');
  }

  function addMIT() {
    const inp = document.getElementById('mitInput');
    const text = inp.value.trim();
    if (!text) return;
    const mits = getMITs();
    if (mits.length >= 5) { App.showToast('Max 5 MIT tasks allowed'); return; }
    mits.push({ text, done: false });
    App.STORE.set('mitTasks', mits);
    inp.value = '';
    render();
  }

  function toggleMIT(i) {
    const mits = getMITs();
    mits[i].done = !mits[i].done;
    App.STORE.set('mitTasks', mits);
    render();
  }

  function deleteMIT(i) {
    const mits = getMITs();
    mits.splice(i, 1);
    App.STORE.set('mitTasks', mits);
    render();
  }

  function reset() {
    App.STORE.set('habitState', DATA.habits.map(() => Array(7).fill(false)));
    render();
    App.showToast('Habit week reset');
  }

  return { render, toggleDot, addMIT, toggleMIT, deleteMIT, reset };

})();
