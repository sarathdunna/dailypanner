/* EXAMS.JS */
const Exams = (() => {
  function render() { _stats(); _subjects(); _roadmap(); _weekTable(); _resources(); }

  function _stats() {
    document.getElementById('examStats').innerHTML=[
      {lbl:'Quant/wk',  val:'~6h',  sub:'~300h/yr', cls:'sv-g'},
      {lbl:'Reasoning', val:'~5h',  sub:'~260h/yr', cls:'sv-b'},
      {lbl:'M.Tech',    val:'~10h', sub:'~500h/yr', cls:'sv-a'},
      {lbl:'KVS Apt.',  val:'~1.5h',sub:'~75h/yr',  cls:'sv-p'},
    ].map(s=>`<div class="stat-card"><div class="stat-lbl">${s.lbl}</div>
      <div class="stat-val ${s.cls}">${s.val}</div><div class="stat-sub">${s.sub}</div></div>`).join('');
  }

  function _subjects() {
    document.getElementById('subjectCards').innerHTML=DATA.subjects.map(s=>`
      <div class="subj-card">
        <div class="subj-head">
          <span class="subj-name">${s.name}</span>
          <span class="subj-wk">${s.weekly}/week</span>
        </div>
        <div class="subj-bar"><div class="subj-fill" style="width:${s.pct}%;background:${s.color}"></div></div>
        <div class="exam-tags">
          <span class="exam-tag">RRB: ${s.rrb}</span>
          <span class="exam-tag">SSC: ${s.ssc}</span>
          <span class="exam-tag">KVS: ${s.kvs}</span>
        </div>
      </div>`).join('');
  }

  function _roadmap() {
    document.getElementById('roadmapList').innerHTML=DATA.roadmap.map((r,i)=>`
      <div class="rm-item">
        <div class="rm-left">
          <div class="rm-num${r.active?' cur':''}">M${i+1}</div>
          ${i<DATA.roadmap.length-1?'<div class="rm-line"></div>':''}
        </div>
        <div class="rm-right">
          <div class="rm-phase">${r.phase}</div>
          <div class="rm-desc">${r.desc}</div>
        </div>
      </div>`).join('');
  }

  function _weekTable() {
    const d=DATA.weeklyStudy;
    document.getElementById('weekTable').innerHTML=`<table class="wtable">
      <thead><tr>${d.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${d.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`;
  }

  function _resources() {
    document.getElementById('resourceList').innerHTML=DATA.resources.map(r=>`
      <div class="res-item">
        <div>
          <div class="res-name">${r.name}</div>
          <div class="res-for">${r.use}</div>
        </div>
        <span class="res-cost ${r.cost==='free'?'cost-free':'cost-book'}">${r.cost==='free'?'Free':'Book'}</span>
      </div>`).join('');
  }

  return {render};
})();
