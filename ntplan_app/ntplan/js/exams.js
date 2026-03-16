/* =============================================
   EXAMS.JS — Exam prep, subjects, roadmap, resources
   ============================================= */

const Exams = (() => {

  function render() {
    renderStats();
    renderSubjects();
    renderRoadmap();
    renderWeekTable();
    renderResources();
  }

  function renderStats() {
    document.getElementById('examStats').innerHTML = [
      { label:'Quant/week',  val:'~6h',  sub:'~300h/year',  cls:'sv-green' },
      { label:'Reasoning',   val:'~5h',  sub:'~260h/year',  cls:'sv-blue' },
      { label:'M.Tech',      val:'~10h', sub:'~500h/year',  cls:'sv-amber' },
      { label:'KVS Aptitude',val:'~1.5h',sub:'~75h/year',   cls:'sv-purple' },
    ].map(s => `<div class="stat-card"><div class="stat-label">${s.label}</div>
      <div class="stat-value ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
  }

  function renderSubjects() {
    document.getElementById('subjectCards').innerHTML = DATA.subjects.map(s =>
      `<div class="subject-card">
        <div class="sc-header">
          <span class="sc-name">${s.name}</span>
          <span class="sc-priority">Weekly: ${s.weekly}</span>
        </div>
        <div class="sc-bar">
          <div class="sc-fill" style="width:${s.pct}%; background:${s.color}"></div>
        </div>
        <div style="display:flex; gap:10px; margin-top:8px; flex-wrap:wrap">
          ${badge('RRB', s.rrb)}
          ${badge('SSC', s.ssc)}
          ${badge('KVS', s.kvs)}
          <span style="margin-left:auto; font-size:10px; color:var(--text3)">${s.yearly}</span>
        </div>
      </div>`
    ).join('');
  }

  function badge(exam, level) {
    const col = level==='Very High' ? 'sv-green' : level==='High' ? 'sv-blue' : level==='N/A' ? '' : 'sv-amber';
    const bg  = level==='Very High' ? 'var(--accent-light)' : level==='High' ? 'var(--blue-light)' : level==='N/A' ? 'var(--bg2)' : 'var(--amber-light)';
    return `<span style="font-size:10px; padding:2px 8px; border-radius:4px; background:${bg}; color:var(--text2)">
      ${exam}: ${level}</span>`;
  }

  function renderRoadmap() {
    document.getElementById('roadmapList').innerHTML = DATA.roadmap.map((r, i) =>
      `<div class="rm-item">
        <div class="rm-left">
          <div class="rm-num ${r.active ? 'active' : ''}">M${i+1}</div>
          ${i < DATA.roadmap.length-1 ? '<div class="rm-line"></div>' : ''}
        </div>
        <div class="rm-right">
          <div class="rm-phase">${r.phase}</div>
          <div class="rm-desc">${r.desc}</div>
        </div>
      </div>`
    ).join('');
  }

  function renderWeekTable() {
    const d = DATA.weeklyStudy;
    document.getElementById('weekTable').innerHTML =
      `<table class="week-table">
        <thead><tr>${d.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${d.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>`;
  }

  function renderResources() {
    document.getElementById('resourceList').innerHTML = DATA.resources.map(r =>
      `<div class="resource-item">
        <div>
          <div class="ri-name">${r.name}</div>
          <div class="ri-for">${r.use}</div>
        </div>
        <span class="ri-cost ${r.cost === 'free' ? 'cost-free' : 'cost-book'}">${r.cost === 'free' ? 'Free' : 'Book'}</span>
      </div>`
    ).join('');
  }

  return { render };

})();
