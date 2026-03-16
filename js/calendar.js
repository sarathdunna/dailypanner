/* CALENDAR.JS */
const Cal = (() => {
  let yr, mo, sel;

  function _init() {
    const n=new Date(); yr=n.getFullYear(); mo=n.getMonth();
    sel=_key(n);
  }

  function _key(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function _tasks(k) { return App.STORE.get('cal_'+k)||[]; }
  function _save(k,t) { App.STORE.set('cal_'+k,t); }

  function render() { _renderCal(); _renderTasks(); }

  function _renderCal() {
    const months=['January','February','March','April','May','June',
      'July','August','September','October','November','December'];
    document.getElementById('calMonthLabel').textContent=months[mo]+' '+yr;
    const first=new Date(yr,mo,1).getDay();
    const days=new Date(yr,mo+1,0).getDate();
    const today=_key(new Date());
    let html='';
    for(let i=0;i<first;i++) html+='<div class="cal-day empty"></div>';
    for(let d=1;d<=days;d++){
      const k=`${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const cls=[
        'cal-day',
        k===today?'today':'',
        k===sel?'selected':'',
        _tasks(k).length?'has-tasks':'',
      ].filter(Boolean).join(' ');
      html+=`<div class="${cls}" onclick="Cal.select('${k}',${d})">${d}</div>`;
    }
    document.getElementById('calGrid').innerHTML=html;
  }

  function _renderTasks() {
    const tasks=_tasks(sel);
    const el=document.getElementById('calTaskList');
    if(!tasks.length){ el.innerHTML='<div class="empty-msg">No tasks yet. Tap "+ Task" to add.</div>'; return; }
    el.innerHTML=tasks.map((t,i)=>`
      <div class="check-item${t.done?' done':''}" onclick="Cal.toggle(${i})">
        <div class="ci-box">${t.done?'✓':''}</div>
        <div style="flex:1">
          <div class="ci-name">${t.text}</div>
          <span class="cat-badge cat-${t.cat||'other'}">${t.cat||'other'}</span>
        </div>
        <button class="mit-del" onclick="Cal.del(${i});event.stopPropagation()">×</button>
      </div>`).join('');
  }

  function select(k,d) {
    sel=k;
    const months=['January','February','March','April','May','June',
      'July','August','September','October','November','December'];
    document.getElementById('calSelLabel').textContent=d+' '+months[mo]+' '+yr;
    _renderCal(); _renderTasks();
  }

  function toggle(i) {
    const t=_tasks(sel); t[i].done=!t[i].done; _save(sel,t);
    _renderTasks(); _renderCal();
  }

  function del(i) {
    const t=_tasks(sel); t.splice(i,1); _save(sel,t);
    _renderTasks(); _renderCal(); App.showToast('Task deleted');
  }

  function openAdd() {
    if(!sel) return App.showToast('Select a date first');
    document.getElementById('calTaskInput').value='';
    document.getElementById('calModal').classList.add('open');
    setTimeout(()=>document.getElementById('calTaskInput').focus(),300);
  }

  function closeAdd() { document.getElementById('calModal').classList.remove('open'); }

  function saveTask() {
    const text=document.getElementById('calTaskInput').value.trim();
    const cat=document.getElementById('calTaskCat').value;
    if(!text) return App.showToast('Enter a task');
    const t=_tasks(sel);
    t.push({text,cat,done:false,created:Date.now()});
    _save(sel,t); closeAdd(); _renderTasks(); _renderCal();
    App.showToast('Task added ✓');
  }

  function prev() { mo--; if(mo<0){mo=11;yr--;} _renderCal(); }
  function next() { mo++; if(mo>11){mo=0;yr++;} _renderCal(); }

  _init();
  return {render,select,toggle,del,openAdd,closeAdd,saveTask,prev,next};
})();
