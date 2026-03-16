/* =============================================
   APP.JS — Core app: init, routing, clock, theme
   ============================================= */

const App = (() => {

  /* ─── STATE (persisted to localStorage) ─── */
  const STORE = {
    get: k => { try { return JSON.parse(localStorage.getItem('ntplan_'+k)); } catch { return null; } },
    set: (k, v) => localStorage.setItem('ntplan_'+k, JSON.stringify(v)),
  };

  /* ─── CLOCK & DATE ─── */
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    document.getElementById('liveClock').textContent = h + ':' + m;

    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    document.getElementById('headerDate').textContent =
      days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

    updateCurrentBanner(now);
  }

  /* ─── CURRENT TASK BANNER ─── */
  function timeStrToMins(str) {
    const m = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return -1;
    let h = parseInt(m[1]), mn = parseInt(m[2]);
    if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
    if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
    return h * 60 + mn;
  }

  function updateCurrentBanner(now) {
    const total = now.getHours() * 60 + now.getMinutes();
    const day = now.getDay(); // 0=Sun
    let slots = DATA.monThu;
    if (day === 6) slots = DATA.saturday;
    else if (day === 0) slots = DATA.sunday;

    let curIdx = -1;
    for (let i = 0; i < slots.length; i++) {
      const start = timeStrToMins(slots[i].t);
      const end   = i + 1 < slots.length ? timeStrToMins(slots[i+1].t) : 1440;
      if (total >= start && total < end) { curIdx = i; break; }
    }

    const taskEl = document.getElementById('cbTask');
    const nextEl = document.getElementById('cbNext');
    if (curIdx >= 0) {
      taskEl.textContent = slots[curIdx].name;
      nextEl.textContent = curIdx + 1 < slots.length
        ? 'Next: ' + slots[curIdx+1].t + ' — ' + slots[curIdx+1].name
        : 'Next: Rest for tomorrow 🌙';
    } else {
      taskEl.textContent = 'Outside scheduled hours';
      nextEl.textContent = '';
    }
  }

  /* ─── DAY STATS ─── */
  function computeStats() {
    const start = new Date('2025-03-23');
    const now   = new Date();
    const dayNum = Math.max(1, Math.floor((now - start) / 86400000) + 1);
    const phase  = dayNum > 45 ? 2 : 1;
    const runWk  = Math.min(12, Math.ceil(dayNum / 7));
    const healthDone = (STORE.get('healthState') || Array(8).fill(false)).filter(Boolean).length;
    return { dayNum, phase, runWk, healthDone };
  }

  function renderTodayStats() {
    const { dayNum, phase, runWk, healthDone } = computeStats();
    const el = document.getElementById('todayStats');
    el.innerHTML = [
      { label:'Day #', val:dayNum, sub:'Since Mar 23', cls:'sv-green' },
      { label:'Phase',  val:phase,  sub:phase===1?'Morning Run':'AM + PM', cls:'sv-amber' },
      { label:'Run Week', val:runWk, sub:'of 12', cls:'sv-blue' },
      { label:'Health',  val:healthDone+'/8', sub:'Done today', cls:'sv-purple' },
    ].map(s => `
      <div class="stat-card">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value ${s.cls}">${s.val}</div>
        <div class="stat-sub">${s.sub}</div>
      </div>`).join('');
  }

  /* ─── TODAY CHECKLIST ─── */
  function renderTodayChecklist() {
    const now = new Date();
    const day = now.getDay();
    let slots = DATA.monThu;
    let label = 'Mon–Thu schedule';
    if (day === 5) { slots = DATA.monThu; label = 'Friday schedule'; }
    if (day === 6) { slots = DATA.saturday; label = 'Saturday — Max Study Day'; }
    if (day === 0) { slots = DATA.sunday; label = 'Sunday — Recovery + Mock'; }

    document.getElementById('todaySubtitle').textContent = label;

    const stateKey = 'today_' + now.toDateString();
    let state = STORE.get(stateKey) || {};

    const el = document.getElementById('todayChecklist');
    el.innerHTML = slots.map((s, i) => {
      const done = !!state[i];
      const catClass = 'cat-' + s.cat;
      return `<div class="check-item ${done ? 'done' : ''}" onclick="App.toggleTodayItem(${i}, '${stateKey}')">
        <div class="ci-box">${done ? '✓' : ''}</div>
        <div class="ci-info">
          <div class="ci-time">${s.t}${s.d ? ' · ' + s.d : ''}</div>
          <div class="ci-name">${s.name}</div>
          <span class="ci-cat ${catClass}">${s.cat}</span>
        </div>
      </div>`;
    }).join('');
  }

  function toggleTodayItem(idx, stateKey) {
    let state = STORE.get(stateKey) || {};
    state[idx] = !state[idx];
    STORE.set(stateKey, state);
    renderTodayChecklist();
    renderTodayStats();
  }

  function resetToday() {
    const stateKey = 'today_' + new Date().toDateString();
    STORE.set(stateKey, {});
    renderTodayChecklist();
  }

  /* ─── THEME ─── */
  function loadTheme() {
    const saved = STORE.get('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeIcon').textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('themeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
    STORE.set('theme', next);
  }

  /* ─── NAVIGATION ─── */
  function goTo(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    if (btn) btn.classList.add('active');
    // Lazy render on first visit
    if (pageId === 'habits')   Habits.render();
    if (pageId === 'fitness')  Fitness.render();
    if (pageId === 'exams')    Exams.render();
    if (pageId === 'calendar') Cal.render();
    if (pageId === 'reminders') Reminders.render();
  }

  /* ─── INIT ─── */
  function init() {
    loadTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('mitInput').addEventListener('keydown', e => { if (e.key === 'Enter') Habits.addMIT(); });
    document.getElementById('aiInput').addEventListener('keydown', e => { if (e.key === 'Enter') AI.send(); });

    tick();
    setInterval(tick, 15000);
    setInterval(Reminders.checkNow, 30000);

    renderTodayStats();
    renderTodayChecklist();

    // Initial lazy renders
    Habits.render();
    Cal.render();
  }

  return { init, goTo, toggleTodayItem, resetToday, computeStats, timeStrToMins, STORE };

})();
