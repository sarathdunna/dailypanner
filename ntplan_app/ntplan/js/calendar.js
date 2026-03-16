/* =============================================
   CALENDAR.JS — Calendar TODO list
   ============================================= */

const Cal = (() => {

  let curYear, curMonth, selectedDate;

  function init() {
    const now = new Date();
    curYear  = now.getFullYear();
    curMonth = now.getMonth();
    selectedDate = dateKey(now);
  }

  function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function getTasks(key) {
    return App.STORE.get('cal_' + key) || [];
  }

  function setTasks(key, tasks) {
    App.STORE.set('cal_' + key, tasks);
  }

  function render() {
    renderCal();
    renderTasks();
  }

  function renderCal() {
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    document.getElementById('calMonthLabel').textContent = months[curMonth] + ' ' + curYear;

    const firstDay = new Date(curYear, curMonth, 1).getDay();
    const daysIn   = new Date(curYear, curMonth+1, 0).getDate();
    const today    = dateKey(new Date());

    let html = '';
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="cal-day empty"></div>';
    }
    // Day cells
    for (let d = 1; d <= daysIn; d++) {
      const key = `${curYear}-${String(curMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const tasks = getTasks(key);
      const isToday    = key === today;
      const isSelected = key === selectedDate;
      const hasTasks   = tasks.length > 0;
      html += `<div class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasTasks ? 'has-tasks' : ''}"
                  onclick="Cal.selectDate('${key}', ${d})">${d}</div>`;
    }
    document.getElementById('calGrid').innerHTML = html;
  }

  function selectDate(key, day) {
    selectedDate = key;
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    document.getElementById('calSelectedLabel').textContent =
      `${day} ${months[curMonth]} ${curYear}`;
    renderCal();
    renderTasks();
  }

  function renderTasks() {
    const tasks = getTasks(selectedDate);
    const el = document.getElementById('calTaskList');
    if (!selectedDate || tasks.length === 0) {
      el.innerHTML = '<div class="empty-state">No tasks yet. Tap "+ Task" to add one.</div>';
      return;
    }
    el.innerHTML = tasks.map((t, i) => {
      const catClass = 'cat-' + (t.cat || 'other');
      return `<div class="check-item ${t.done ? 'done' : ''}" onclick="Cal.toggleTask(${i})">
        <div class="ci-box">${t.done ? '✓' : ''}</div>
        <div class="ci-info">
          <div class="ci-name">${t.text}</div>
          <span class="ci-cat ${catClass}">${t.cat || 'other'}</span>
        </div>
        <button class="mit-del" onclick="Cal.deleteTask(${i}); event.stopPropagation()">×</button>
      </div>`;
    }).join('');
  }

  function toggleTask(i) {
    const tasks = getTasks(selectedDate);
    tasks[i].done = !tasks[i].done;
    setTasks(selectedDate, tasks);
    renderTasks();
    renderCal();
  }

  function deleteTask(i) {
    const tasks = getTasks(selectedDate);
    tasks.splice(i, 1);
    setTasks(selectedDate, tasks);
    renderTasks();
    renderCal();
  }

  function openAdd() {
    if (!selectedDate) return App.showToast('Select a date first');
    document.getElementById('calAddModal').classList.add('open');
    document.getElementById('calTaskInput').value = '';
    document.getElementById('calTaskInput').focus();
  }

  function closeAdd() {
    document.getElementById('calAddModal').classList.remove('open');
  }

  function saveTask() {
    const text = document.getElementById('calTaskInput').value.trim();
    const cat  = document.getElementById('calTaskCat').value;
    if (!text) return;
    const tasks = getTasks(selectedDate);
    tasks.push({ text, cat, done: false, created: Date.now() });
    setTasks(selectedDate, tasks);
    closeAdd();
    renderTasks();
    renderCal();
    App.showToast('Task added ✓');
  }

  function prev() { curMonth--; if (curMonth < 0) { curMonth = 11; curYear--; } renderCal(); }
  function next() { curMonth++; if (curMonth > 11) { curMonth = 0; curYear++; } renderCal(); }

  init();
  return { render, selectDate, toggleTask, deleteTask, openAdd, closeAdd, saveTask, prev, next };

})();

/* Toast helper */
App.showToast = function(msg, dur = 2200) {
  const t = document.getElementById('reminderToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
};
