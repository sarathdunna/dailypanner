/* =============================================
   REMINDERS.JS — Dynamic reminders system
   ============================================= */

const Reminders = (() => {

  const catIcons = { study:'📚', fitness:'🏃', health:'🌿', exam:'📝', other:'📌' };
  let editingId = null;

  function getAll() { return App.STORE.get('reminders') || []; }
  function setAll(arr) { App.STORE.set('reminders', arr); }

  function render() {
    renderList();
    renderUpcoming();
  }

  function renderList() {
    const all = getAll();
    const el  = document.getElementById('reminderList');
    if (all.length === 0) {
      el.innerHTML = '<div class="empty-state">No reminders yet. Tap "+ New" to add one.</div>';
      return;
    }
    el.innerHTML = all.map(r =>
      `<div class="reminder-card">
        <div class="rem-icon">${catIcons[r.cat] || '📌'}</div>
        <div class="rem-info">
          <div class="rem-title">${r.title}</div>
          <div class="rem-meta">
            <span>⏰ ${r.time}</span>
            <span>🔁 ${r.repeat}</span>
            <span class="ci-cat cat-${r.cat}" style="padding:1px 7px">${r.cat}</span>
          </div>
          ${r.note ? `<div class="rem-note">${r.note}</div>` : ''}
        </div>
        <div class="rem-actions">
          <button class="rem-toggle ${r.active ? 'on' : ''}" onclick="Reminders.toggleActive('${r.id}')"></button>
          <button class="mit-del" onclick="Reminders.edit('${r.id}')">✏️</button>
          <button class="rem-del" onclick="Reminders.delete('${r.id}')">×</button>
        </div>
      </div>`
    ).join('');
  }

  function renderUpcoming() {
    const now = new Date();
    const curMins = now.getHours() * 60 + now.getMinutes();
    const all = getAll().filter(r => r.active);
    const today = now.getDay();

    const upcoming = all.filter(r => {
      const [h, m] = r.time.split(':').map(Number);
      const rMins = h * 60 + m;
      if (rMins <= curMins) return false;
      if (r.repeat === 'daily') return true;
      if (r.repeat === 'weekdays') return today >= 1 && today <= 5;
      if (r.repeat === 'weekends') return today === 0 || today === 6;
      if (r.repeat === 'once') return true;
      return false;
    }).sort((a, b) => a.time.localeCompare(b.time));

    const el = document.getElementById('upcomingReminders');
    if (upcoming.length === 0) {
      el.innerHTML = '<div class="empty-state">No upcoming reminders for today.</div>';
      return;
    }
    el.innerHTML = upcoming.map(r => {
      const [h, m] = r.time.split(':').map(Number);
      const rMins = h * 60 + m;
      const diff  = rMins - curMins;
      const diffStr = diff < 60
        ? `in ${diff} min`
        : `in ${Math.floor(diff/60)}h ${diff%60}m`;
      return `<div class="reminder-card">
        <div class="rem-icon">${catIcons[r.cat] || '📌'}</div>
        <div class="rem-info">
          <div class="rem-title">${r.title}</div>
          <div class="rem-meta"><span>⏰ ${r.time} — ${diffStr}</span></div>
          ${r.note ? `<div class="rem-note">${r.note}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  function openAdd() {
    editingId = null;
    document.getElementById('reminderModalTitle').textContent = 'New Reminder';
    document.getElementById('remTitle').value = '';
    document.getElementById('remNote').value  = '';
    document.getElementById('remTime').value  = '';
    document.getElementById('remRepeat').value = 'daily';
    document.getElementById('remCategory').value = 'other';
    document.getElementById('reminderModal').classList.add('open');
    document.getElementById('remTitle').focus();
  }

  function edit(id) {
    const r = getAll().find(x => x.id === id);
    if (!r) return;
    editingId = id;
    document.getElementById('reminderModalTitle').textContent = 'Edit Reminder';
    document.getElementById('remTitle').value    = r.title;
    document.getElementById('remNote').value     = r.note || '';
    document.getElementById('remTime').value     = r.time;
    document.getElementById('remRepeat').value   = r.repeat;
    document.getElementById('remCategory').value = r.cat;
    document.getElementById('reminderModal').classList.add('open');
  }

  function closeAdd() {
    document.getElementById('reminderModal').classList.remove('open');
    editingId = null;
  }

  function save() {
    const title = document.getElementById('remTitle').value.trim();
    const note  = document.getElementById('remNote').value.trim();
    const time  = document.getElementById('remTime').value;
    const repeat = document.getElementById('remRepeat').value;
    const cat   = document.getElementById('remCategory').value;

    if (!title || !time) { App.showToast('Title and time are required'); return; }

    const all = getAll();
    if (editingId) {
      const idx = all.findIndex(x => x.id === editingId);
      if (idx >= 0) { all[idx] = { ...all[idx], title, note, time, repeat, cat }; }
    } else {
      all.push({ id: 'r' + Date.now(), title, note, time, repeat, cat, active: true, created: Date.now() });
    }
    setAll(all);
    closeAdd();
    render();
    App.showToast(editingId ? 'Reminder updated ✓' : 'Reminder added ✓');
  }

  function delete_(id) {
    const all = getAll().filter(x => x.id !== id);
    setAll(all);
    render();
    App.showToast('Reminder deleted');
  }

  function toggleActive(id) {
    const all = getAll();
    const idx = all.findIndex(x => x.id === id);
    if (idx >= 0) all[idx].active = !all[idx].active;
    setAll(all);
    render();
  }

  /* ─── BACKGROUND CHECK (every 30s) ─── */
  function checkNow() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2,'0');
    const mm  = String(now.getMinutes()).padStart(2,'0');
    const curTime = `${hh}:${mm}`;
    const today = now.getDay();

    getAll().filter(r => r.active && r.time === curTime).forEach(r => {
      if (r.repeat === 'daily') toast(r);
      else if (r.repeat === 'weekdays' && today >= 1 && today <= 5) toast(r);
      else if (r.repeat === 'weekends' && (today === 0 || today === 6)) toast(r);
      else if (r.repeat === 'once') {
        toast(r);
        const all = getAll().map(x => x.id === r.id ? { ...x, active: false } : x);
        setAll(all);
      }
    });
  }

  function toast(r) {
    App.showToast('🔔 ' + r.title + (r.note ? ' — ' + r.note : ''), 5000);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('NT Life Plan', { body: r.title + (r.note ? '\n' + r.note : '') });
    }
  }

  return {
    render, openAdd, closeAdd, save, edit,
    delete: delete_, toggleActive, checkNow
  };

})();
