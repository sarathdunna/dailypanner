/* NT LIFE PLAN — STYLE.CSS */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── LIGHT VARIABLES ── */
:root {
  --bg:        #f0f5fb;
  --bg2:       #e8eef8;
  --surface:   #ffffff;
  --surface2:  #f7f9fd;
  --border:    #e0e8f4;
  --border2:   #c8d5ec;
  --text:      #1a2340;
  --text2:     #4a5570;
  --text3:     #8a93b0;
  --green:     #10b981;
  --green-l:   #d1fae5;
  --green-d:   #065f46;
  --blue:      #3b82f6;
  --blue-l:    #dbeafe;
  --amber:     #f59e0b;
  --amber-l:   #fef3c7;
  --red:       #ef4444;
  --red-l:     #fee2e2;
  --purple:    #8b5cf6;
  --purple-l:  #ede9fe;
  --teal:      #06b6d4;
  --teal-l:    #cffafe;
  --shadow:    0 2px 20px rgba(26,35,64,0.08);
  --shadow-sm: 0 1px 8px rgba(26,35,64,0.06);
  --r:   16px;
  --r-sm: 10px;
  --r-xs:  6px;
  --nav-h:    68px;
  --head-h:   58px;
  --fn-display: 'Syne', sans-serif;
  --fn-body:    'DM Sans', sans-serif;
}

/* ── DARK VARIABLES ── */
[data-theme="dark"] {
  --bg:       #0d1117;
  --bg2:      #161c26;
  --surface:  #1c2436;
  --surface2: #222d42;
  --border:   #2a3554;
  --border2:  #374570;
  --text:     #e2e8f8;
  --text2:    #8b93b8;
  --text3:    #4a5278;
  --green:    #34d399;
  --green-l:  rgba(52,211,153,.13);
  --green-d:  #34d399;
  --blue:     #60a5fa;
  --blue-l:   rgba(96,165,250,.13);
  --amber:    #fbbf24;
  --amber-l:  rgba(251,191,36,.13);
  --red:      #f87171;
  --red-l:    rgba(248,113,113,.13);
  --purple:   #a78bfa;
  --purple-l: rgba(167,139,250,.13);
  --teal:     #22d3ee;
  --teal-l:   rgba(34,211,238,.13);
  --shadow:   0 2px 20px rgba(0,0,0,.4);
  --shadow-sm:0 1px 8px rgba(0,0,0,.3);
}

/* ── RESET ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;font-family:var(--fn-body);background:var(--bg);color:var(--text);overflow:hidden;transition:background .3s,color .3s}
button{cursor:pointer;font-family:var(--fn-body)}
input,textarea,select{font-family:var(--fn-body);color:var(--text)}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

/* ── HEADER ── */
.top-header{
  position:fixed;top:0;left:0;right:0;
  height:var(--head-h);
  background:var(--surface);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 18px;
  z-index:200;
  box-shadow:var(--shadow-sm);
}
.header-left{display:flex;align-items:center;gap:10px}
.app-logo{
  width:34px;height:34px;
  background:linear-gradient(135deg,var(--green),var(--blue));
  border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:17px;flex-shrink:0;
}
.app-name{font-family:var(--fn-display);font-size:16px;font-weight:800;color:var(--text);line-height:1.1}
.app-date{font-size:10px;color:var(--text3);margin-top:1px}
.header-right{display:flex;align-items:center;gap:10px}
.live-clock{font-family:var(--fn-display);font-size:17px;font-weight:700;color:var(--green);letter-spacing:1px}
.icon-btn{
  width:34px;height:34px;border-radius:50%;
  border:1px solid var(--border);background:var(--surface2);
  display:flex;align-items:center;justify-content:center;font-size:15px;
  transition:all .2s;
}
.icon-btn:hover{background:var(--green-l);border-color:var(--green)}

/* ── PAGES ── */
.pages-wrap{
  position:fixed;
  top:var(--head-h);bottom:var(--nav-h);
  left:0;right:0;overflow:hidden;
}
.page{
  position:absolute;inset:0;
  overflow-y:auto;-webkit-overflow-scrolling:touch;
  opacity:0;pointer-events:none;
  transform:translateY(10px);
  transition:opacity .22s ease,transform .22s ease;
}
.page.active{opacity:1;pointer-events:all;transform:translateY(0)}
.page-inner{padding:18px 16px 24px;max-width:600px;margin:0 auto}

/* ── PAGE HEAD ── */
.page-head{margin-bottom:18px}
.page-title{font-family:var(--fn-display);font-size:22px;font-weight:800;color:var(--text)}
.page-sub{font-size:12px;color:var(--text3);margin-top:2px}

/* ── CURRENT BANNER ── */
.current-banner{
  position:relative;
  background:var(--green-l);
  border:1.5px solid var(--green);
  border-radius:var(--r);
  padding:14px 16px 14px 48px;
  margin-bottom:16px;
  overflow:hidden;
}
.pulse-ring{
  position:absolute;left:16px;top:50%;transform:translateY(-50%);
  width:18px;height:18px;border-radius:50%;
  border:2px solid var(--green);
  animation:ringPulse 2s ease infinite;
}
.pulse-dot{
  position:absolute;left:21px;top:50%;transform:translateY(-50%);
  width:8px;height:8px;border-radius:50%;background:var(--green);
}
@keyframes ringPulse{0%,100%{transform:translateY(-50%) scale(1);opacity:1}50%{transform:translateY(-50%) scale(1.6);opacity:0}}
.cb-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--green-d)}
.cb-task{font-family:var(--fn-display);font-size:14px;font-weight:700;color:var(--text);margin-top:2px;line-height:1.3}
.cb-next{font-size:11px;color:var(--text3);margin-top:3px}

/* ── STATS ROW ── */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:12px 10px;box-shadow:var(--shadow-sm)}
.stat-lbl{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--text3)}
.stat-val{font-family:var(--fn-display);font-size:20px;font-weight:800;margin-top:3px;line-height:1}
.stat-sub{font-size:9px;color:var(--text3);margin-top:2px}
.sv-g{color:var(--green)} .sv-b{color:var(--blue)} .sv-a{color:var(--amber)} .sv-p{color:var(--purple)} .sv-t{color:var(--teal)}

/* ── SECTION HEADING ── */
.sec-head{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--fn-display);font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.9px;color:var(--text3);
  margin-bottom:10px;margin-top:4px;
}

/* ── PROGRESS BAR ── */
.prog-track{height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:14px}
.prog-fill{height:100%;border-radius:2px;transition:width .4s ease}
.prog-fill.green{background:var(--green)}
.prog-fill.amber{background:var(--amber)}
.prog-fill.blue{background:var(--blue)}
.prog-label{font-size:11px;font-weight:600;color:var(--text2)}

/* ── CHECK LIST ── */
.check-list{display:flex;flex-direction:column;gap:7px}
.check-item{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r-sm);padding:11px 13px;
  display:flex;align-items:flex-start;gap:11px;
  box-shadow:var(--shadow-sm);cursor:pointer;user-select:none;
  transition:border-color .15s,opacity .2s,transform .1s;
  -webkit-tap-highlight-color:transparent;
}
.check-item:active{transform:scale(.98)}
.check-item.done{opacity:.52}
.check-item.done .ci-name{text-decoration:line-through;color:var(--text3)}
.check-item.synced-active{border-color:var(--green)!important;background:var(--green-l)}
.ci-box{
  width:22px;height:22px;min-width:22px;border-radius:6px;
  border:2px solid var(--border2);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;margin-top:1px;
  transition:all .18s;flex-shrink:0;
}
.check-item.done .ci-box{background:var(--green);border-color:var(--green);color:#fff}
.ci-time{font-size:10px;color:var(--text3);font-weight:500;margin-bottom:1px}
.ci-name{font-size:13px;font-weight:500;color:var(--text);line-height:1.35}
.ci-row{display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap}
.cat-badge{
  display:inline-flex;align-items:center;
  padding:2px 7px;border-radius:4px;
  font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;
}
.cat-fitness {background:var(--green-l);color:var(--green-d)}
.cat-health  {background:var(--amber-l);color:var(--amber)}
.cat-study   {background:var(--blue-l); color:var(--blue)}
.cat-college {background:var(--red-l);  color:var(--red)}
.cat-other   {background:var(--bg2);    color:var(--text3)}
.cat-exam    {background:var(--purple-l);color:var(--purple)}
.sync-badge{background:var(--green-l);color:var(--green-d);font-size:9px;padding:2px 6px;border-radius:4px;font-weight:600}

/* ── CALENDAR ── */
.cal-wrap{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:18px;box-shadow:var(--shadow-sm)}
.cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.cal-arr{
  width:30px;height:30px;border-radius:8px;
  border:1px solid var(--border);background:var(--surface2);
  color:var(--text2);font-size:18px;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.cal-arr:hover{background:var(--green-l);border-color:var(--green);color:var(--green)}
.cal-month{font-family:var(--fn-display);font-size:15px;font-weight:700;color:var(--text)}
.cal-dow{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;margin-bottom:6px}
.cal-dow span{font-size:10px;font-weight:600;color:var(--text3);padding:3px 0}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.cal-day{
  aspect-ratio:1;border-radius:7px;border:1px solid transparent;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-size:12px;font-weight:500;color:var(--text2);
  cursor:pointer;position:relative;transition:all .15s;
}
.cal-day:hover{background:var(--bg2);border-color:var(--border)}
.cal-day.today{background:var(--green-l);border-color:var(--green);color:var(--green);font-weight:700}
.cal-day.selected{background:var(--green);border-color:var(--green);color:#fff;font-weight:700}
.cal-day.has-tasks::after{content:'';width:4px;height:4px;border-radius:50%;background:var(--amber);position:absolute;bottom:3px}
.cal-day.selected::after{background:rgba(255,255,255,.7)}
.cal-day.empty{pointer-events:none;opacity:0}

/* ── HABIT GRID ── */
.habit-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:13px;margin-bottom:8px;box-shadow:var(--shadow-sm)}
.habit-card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.habit-card-name{font-size:13px;font-weight:600;color:var(--text)}
.habit-streak{font-size:11px;color:var(--green);font-weight:600}
.habit-dots-row{display:flex;gap:5px}
.hd-wrap{display:flex;flex-direction:column;align-items:center;gap:3px}
.hd{
  width:30px;height:30px;border-radius:8px;
  border:1.5px solid var(--border2);background:var(--surface2);
  cursor:pointer;transition:all .15s;
}
.hd:hover{border-color:var(--green)}
.hd.on-g{background:var(--green);border-color:var(--green)}
.hd.on-a{background:var(--amber);border-color:var(--amber)}
.hd.on-b{background:var(--blue);border-color:var(--blue)}
.hd.today-col{box-shadow:0 0 0 2px var(--green)}
.hd-lbl{font-size:8px;color:var(--text3);font-weight:600}

/* ── MIT TASKS ── */
.mit-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:11px 13px;display:flex;align-items:center;gap:10px;margin-bottom:7px;box-shadow:var(--shadow-sm)}
.mit-chk{width:22px;height:22px;min-width:22px;border-radius:50%;border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;transition:all .18s}
.mit-chk.on{background:var(--blue);border-color:var(--blue);color:#fff}
.mit-txt{flex:1;font-size:13px;font-weight:500;color:var(--text)}
.mit-txt.done{text-decoration:line-through;color:var(--text3)}
.mit-del{background:none;border:none;color:var(--text3);font-size:18px;padding:0 3px}
.mit-del:hover{color:var(--red)}

/* ── ADD ROW ── */
.add-row{display:flex;gap:7px;margin-top:10px}

/* ── BUTTONS ── */
.ghost-btn{padding:6px 13px;border-radius:var(--r-xs);font-size:12px;font-weight:600;border:1px solid var(--border);background:var(--surface2);color:var(--text2);transition:all .2s}
.ghost-btn:hover{border-color:var(--border2);background:var(--bg2)}
.ghost-btn.full{flex:1}
.primary-btn{padding:9px 16px;border-radius:var(--r-xs);font-size:12px;font-weight:700;border:none;background:var(--green);color:#fff;transition:background .2s}
.primary-btn:hover{background:var(--green-d)}
.primary-btn.sm{padding:6px 13px;font-size:12px}
.primary-btn.full{flex:1}

/* ── FIELD ── */
.field{
  width:100%;padding:10px 13px;
  border-radius:var(--r-xs);border:1.5px solid var(--border);
  background:var(--surface2);font-size:13px;color:var(--text);
  transition:border-color .2s;
}
.field:focus{outline:none;border-color:var(--green)}
.field::placeholder{color:var(--text3)}
select.field option{background:var(--surface);color:var(--text)}

/* ── INFO CHIP ── */
.info-chip{border-radius:var(--r-xs);padding:10px 13px;font-size:11px;line-height:1.6;margin-bottom:14px}
.info-chip.warn{background:var(--amber-l);color:var(--amber);border-left:3px solid var(--amber)}
.info-chip.info{background:var(--blue-l);color:var(--blue);border-left:3px solid var(--blue)}

/* ── HEALTH CHECKLIST ── */
.health-item{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);
  padding:11px 13px;display:flex;align-items:flex-start;gap:11px;
  margin-bottom:7px;cursor:pointer;user-select:none;
  transition:opacity .2s,border-color .2s;box-shadow:var(--shadow-sm);
  -webkit-tap-highlight-color:transparent;
}
.health-item.done{opacity:.5}
.health-item.done .hi-name{text-decoration:line-through}
.health-item.synced-active{border-color:var(--green)!important;background:var(--green-l)}
.hi-chk{width:22px;height:22px;min-width:22px;border-radius:50%;border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;margin-top:1px;transition:all .18s;flex-shrink:0}
.health-item.done .hi-chk{background:var(--amber);border-color:var(--amber);color:#fff}
.hi-name{font-size:13px;font-weight:500;color:var(--text)}
.hi-time{font-size:10px;color:var(--text3);margin-top:2px}
.hi-ben{font-size:10px;color:var(--amber);margin-top:2px}

/* ── RUN WEEK CARDS ── */
.run-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);margin-bottom:7px;overflow:hidden;box-shadow:var(--shadow-sm)}
.run-card.cur{border-color:var(--green)}
.run-card-head{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;cursor:pointer}
.run-card-title{font-family:var(--fn-display);font-size:13px;font-weight:700;color:var(--text)}
.run-card-focus{font-size:11px;color:var(--green);font-weight:600}
.run-card-body{padding:0 13px 11px;border-top:1px solid var(--border);display:none}
.run-card.open .run-card-body{display:block}
.run-row{padding:6px 0;border-bottom:1px solid var(--border);font-size:11px;color:var(--text2)}
.run-row:last-child{border-bottom:none}
.run-row strong{color:var(--text);font-weight:600}

/* ── SUBJECT CARDS ── */
.subj-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:13px;margin-bottom:7px;box-shadow:var(--shadow-sm)}
.subj-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.subj-name{font-size:13px;font-weight:600;color:var(--text)}
.subj-wk{font-size:11px;color:var(--text3)}
.subj-bar{height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:8px}
.subj-fill{height:100%;border-radius:3px}
.exam-tags{display:flex;gap:5px;flex-wrap:wrap}
.exam-tag{font-size:10px;padding:2px 7px;border-radius:4px;background:var(--bg2);color:var(--text2)}

/* ── ROADMAP ── */
.rm-item{display:flex;gap:12px;margin-bottom:16px}
.rm-left{display:flex;flex-direction:column;align-items:center}
.rm-num{width:28px;height:28px;border-radius:50%;background:var(--bg2);border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;font-family:var(--fn-display);font-size:10px;font-weight:800;color:var(--text3);flex-shrink:0}
.rm-num.cur{background:var(--green-l);border-color:var(--green);color:var(--green-d)}
.rm-line{width:2px;flex:1;background:var(--border);margin:4px 0}
.rm-right{flex:1;padding-bottom:2px}
.rm-phase{font-size:13px;font-weight:600;color:var(--text);margin-bottom:3px}
.rm-desc{font-size:11px;color:var(--text3);line-height:1.6}

/* ── WEEK TABLE ── */
.scroll-x{overflow-x:auto;margin-bottom:8px;-webkit-overflow-scrolling:touch}
.wtable{width:100%;border-collapse:collapse;font-size:10px;min-width:480px}
.wtable th{padding:6px 7px;background:var(--bg2);color:var(--text3);font-weight:700;text-align:center;border:1px solid var(--border);white-space:nowrap}
.wtable td{padding:5px 7px;border:1px solid var(--border);color:var(--text2);text-align:center;white-space:nowrap}

/* ── RESOURCE LIST ── */
.res-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:11px 13px;margin-bottom:7px;display:flex;align-items:center;justify-content:space-between;box-shadow:var(--shadow-sm)}
.res-name{font-size:13px;font-weight:500;color:var(--text)}
.res-for{font-size:10px;color:var(--text3);margin-top:2px}
.res-cost{padding:3px 9px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap}
.cost-free{background:var(--green-l);color:var(--green-d)}
.cost-book{background:var(--amber-l);color:var(--amber)}

/* ── AI CHAT ── */
.ai-hero{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;gap:13px;margin-bottom:14px;box-shadow:var(--shadow-sm)}
.ai-avatar-big{font-size:28px}
.ai-hero-title{font-family:var(--fn-display);font-size:14px;font-weight:700;color:var(--text)}
.ai-hero-sub{font-size:11px;color:var(--text3);margin-top:2px;line-height:1.4}
.quick-row{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px}
.quick-btn{padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:var(--surface);color:var(--text2);font-size:11px;font-weight:500;transition:all .2s}
.quick-btn:hover{background:var(--green-l);border-color:var(--green);color:var(--green-d)}
.chat-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px;min-height:180px;max-height:320px;overflow-y:auto;margin-bottom:10px;display:flex;flex-direction:column;gap:12px;box-shadow:var(--shadow-sm)}
.chat-msg{display:flex;align-items:flex-start;gap:9px}
.chat-msg.user{flex-direction:row-reverse}
.chat-av{width:28px;height:28px;border-radius:50%;background:var(--green-l);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.chat-msg.user .chat-av{background:var(--blue-l)}
.chat-bubble{background:var(--bg2);border:1px solid var(--border);border-radius:12px 12px 12px 4px;padding:9px 13px;font-size:12px;line-height:1.6;color:var(--text);max-width:85%}
.chat-msg.user .chat-bubble{background:var(--blue-l);border-color:var(--blue);border-radius:12px 12px 4px 12px}
.chat-msg.typing .chat-bubble{color:var(--text3);font-style:italic}
.chat-row{display:flex;gap:7px}
.chat-inp{flex:1;padding:10px 15px;border-radius:25px;border:1.5px solid var(--border);background:var(--surface);font-size:13px;color:var(--text);transition:border-color .2s}
.chat-inp:focus{outline:none;border-color:var(--green)}
.send-btn{width:42px;height:42px;border-radius:50%;border:none;background:var(--green);color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}
.send-btn:hover{background:var(--green-d)}
.send-btn:disabled{background:var(--border2);cursor:not-allowed}

/* ── REMINDERS ── */
.rem-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:13px;display:flex;align-items:flex-start;gap:11px;margin-bottom:7px;box-shadow:var(--shadow-sm)}
.rem-ico{font-size:20px;flex-shrink:0;margin-top:1px}
.rem-info{flex:1}
.rem-title{font-size:13px;font-weight:600;color:var(--text)}
.rem-meta{font-size:10px;color:var(--text3);margin-top:3px;display:flex;gap:8px;flex-wrap:wrap}
.rem-note{font-size:11px;color:var(--text2);margin-top:3px}
.rem-acts{display:flex;gap:6px;align-items:center}
.rem-toggle{width:36px;height:20px;border-radius:10px;background:var(--border2);position:relative;border:none;cursor:pointer;transition:background .2s;flex-shrink:0}
.rem-toggle.on{background:var(--green)}
.rem-toggle::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .18s}
.rem-toggle.on::after{left:18px}
.rem-del{background:none;border:none;color:var(--text3);font-size:17px;padding:2px 3px}
.rem-del:hover{color:var(--red)}

/* ── SHEET / MODAL ── */
.sheet-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s}
.sheet-overlay.open{opacity:1;pointer-events:all}
.sheet{background:var(--surface);border-radius:20px 20px 0 0;padding:20px 18px 36px;width:100%;max-width:520px;transform:translateY(40px);transition:transform .25s;display:flex;flex-direction:column;gap:11px}
.sheet-overlay.open .sheet{transform:translateY(0)}
.sheet-bar{width:36px;height:4px;border-radius:2px;background:var(--border2);margin:0 auto -4px}
.sheet-title{font-family:var(--fn-display);font-size:17px;font-weight:800;color:var(--text)}
.sheet-btns{display:flex;gap:8px;margin-top:4px}

/* ── BADGE ── */
.badge{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700}
.badge.green{background:var(--green-l);color:var(--green-d)}
.empty-msg{font-size:13px;color:var(--text3);text-align:center;padding:20px}

/* ── FAB ── */
.fab{
  position:fixed;
  bottom:calc(var(--nav-h) + 16px);right:16px;
  background:var(--green);color:#fff;border:none;
  border-radius:28px;padding:10px 14px;
  display:flex;align-items:center;gap:6px;
  box-shadow:0 4px 20px rgba(16,185,129,.4);
  z-index:150;cursor:pointer;
  transition:all .2s;
}
.fab:hover{background:var(--green-d);transform:translateY(-2px)}
.fab.running{background:var(--amber);box-shadow:0 4px 20px rgba(245,158,11,.4)}
.fab-ico{font-size:18px;line-height:1}
.fab-txt{font-family:var(--fn-display);font-size:13px;font-weight:700;min-width:0}

/* ── TIMER SHEET ── */
.timer-sheet{padding-bottom:32px}
.timer-modes{display:flex;gap:6px;background:var(--bg2);border-radius:10px;padding:4px}
.t-mode{flex:1;padding:8px 6px;border-radius:8px;border:none;background:none;font-size:12px;font-weight:600;color:var(--text3);cursor:pointer;transition:all .2s}
.t-mode.active{background:var(--surface);color:var(--text);box-shadow:var(--shadow-sm)}
.timer-ring-wrap{position:relative;width:220px;height:220px;margin:8px auto}
.timer-svg{width:220px;height:220px;transform:rotate(-90deg)}
.ring-bg{fill:none;stroke:var(--border);stroke-width:10}
.ring-fg{fill:none;stroke:var(--green);stroke-width:10;stroke-linecap:round;stroke-dasharray:596.9;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear,stroke .3s}
.timer-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.timer-time{font-family:var(--fn-display);font-size:40px;font-weight:800;color:var(--text);letter-spacing:-1px}
.timer-lbl{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-top:2px}
.timer-dots{display:flex;gap:7px;margin-top:8px}
.t-dot{width:10px;height:10px;border-radius:50%;background:var(--border2)}
.t-dot.done{background:var(--green)}
.t-dot.current{background:var(--green);box-shadow:0 0 0 3px var(--green-l)}
.timer-ctrls{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:4px}
.t-ctrl{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--border);background:var(--surface2);color:var(--text2);font-size:20px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.t-ctrl:hover{border-color:var(--border2);background:var(--bg2)}
.t-play{width:62px;height:62px;border-radius:50%;border:none;background:var(--green);color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(16,185,129,.35);transition:all .2s}
.t-play:hover{background:var(--green-d);transform:scale(1.05)}
.t-play.pause{background:var(--amber);box-shadow:0 4px 16px rgba(245,158,11,.35)}
.timer-custom{display:flex;align-items:center;justify-content:center;gap:10px;font-size:12px;color:var(--text3);margin-top:6px}
.t-custom-inp{width:60px;padding:6px 8px;border-radius:6px;border:1.5px solid var(--border);background:var(--surface2);font-size:13px;text-align:center;color:var(--text)}
.t-custom-inp:focus{outline:none;border-color:var(--green)}

/* ── BOTTOM NAV ── */
.bottom-nav{
  position:fixed;bottom:0;left:0;right:0;
  height:var(--nav-h);
  background:var(--surface);border-top:1px solid var(--border);
  display:flex;z-index:200;
  box-shadow:0 -3px 16px rgba(0,0,0,.06);
  padding-bottom:env(safe-area-inset-bottom,0);
}
.nav-btn{
  flex:1;border:none;background:none;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;padding:6px 2px;color:var(--text3);
  transition:color .2s;position:relative;
  -webkit-tap-highlight-color:transparent;
}
.nav-btn::after{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:0;height:3px;background:var(--green);border-radius:0 0 3px 3px;transition:width .2s}
.nav-btn.active{color:var(--green)}
.nav-btn.active::after{width:22px}
.nav-ico{font-size:19px;line-height:1}
.nav-lbl{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}

/* ── TOAST ── */
.toast{
  position:fixed;bottom:calc(var(--nav-h)+14px);left:50%;
  transform:translateX(-50%) translateY(20px);
  background:var(--text);color:var(--bg);
  padding:10px 18px;border-radius:25px;
  font-size:12px;font-weight:600;
  opacity:0;transition:all .25s;z-index:999;
  pointer-events:none;max-width:300px;text-align:center;
  white-space:nowrap;
}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* ── RESPONSIVE ── */
@media(max-width:380px){
  .stats-row{grid-template-columns:repeat(2,1fr)}
  .nav-lbl{font-size:8px}
  .stat-val{font-size:17px}
}
@media(max-width:320px){
  .nav-lbl{display:none}
  .nav-ico{font-size:22px}
}

/* ══ LOGIN SCREEN ══ */
.login-screen {
  position:fixed;inset:0;z-index:1000;
  background:var(--bg);
  display:none;align-items:center;justify-content:center;
  padding:20px;
  animation:fadeIn .3s ease;
}
.login-screen.active { display:flex; }
.app-shell { display:none; }
.app-shell.active { display:block; }

@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

.login-box {
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:24px;
  padding:32px 28px 28px;
  width:100%;max-width:400px;
  box-shadow:var(--shadow);
  display:flex;flex-direction:column;gap:16px;
  animation:fadeIn .35s ease;
}
.login-logo {
  width:56px;height:56px;
  background:linear-gradient(135deg,var(--green),var(--blue));
  border-radius:16px;
  display:flex;align-items:center;justify-content:center;
  font-size:28px;margin:0 auto;
}
.login-title {
  font-family:var(--fn-display);font-size:26px;font-weight:800;
  color:var(--text);text-align:center;margin-top:4px;
}
.login-sub { font-size:13px;color:var(--text3);text-align:center;line-height:1.5;margin-top:-8px; }

.login-step { display:flex;flex-direction:column;gap:10px; }
.login-field-label { font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.6px; }

.phone-row { display:flex;gap:8px; }
.country-select { width:110px;flex-shrink:0; }
.phone-field { flex:1; }
.otp-field { text-align:center;font-family:var(--fn-display);font-size:22px;font-weight:800;letter-spacing:8px; }
.otp-sent-msg { font-size:13px;color:var(--text2);text-align:center;padding:8px 12px;background:var(--green-l);border-radius:8px; }
.otp-sent-msg strong { color:var(--green-d); }

.login-btn { padding:13px;font-size:14px;border-radius:12px;margin-top:4px; }

.login-loading {
  text-align:center;font-size:13px;color:var(--text3);
  padding:8px;animation:pulse2 1.5s infinite;
}
@keyframes pulse2{0%,100%{opacity:1}50%{opacity:.4}}

.login-error {
  background:var(--red-l);border:1px solid var(--red);
  border-radius:8px;padding:10px 14px;
  font-size:12px;color:var(--red);line-height:1.5;text-align:center;
}
.login-footer { font-size:10px;color:var(--text3);text-align:center;line-height:1.6; }

/* ── SYNC INDICATOR ── */
.sync-row { display:flex;align-items:center;gap:5px; }
.sync-dot {
  width:8px;height:8px;border-radius:50%;
  background:var(--border2);
  transition:background .3s;
  flex-shrink:0;
}
.sync-time { font-size:9px;color:var(--text3);font-weight:500; }

/* ── USER CHIP ── */
.user-chip {
  padding:5px 11px;border-radius:20px;
  border:1px solid var(--border);background:var(--surface2);
  font-size:11px;font-weight:600;color:var(--text2);
  cursor:pointer;transition:all .2s;white-space:nowrap;
}
.user-chip:hover { background:var(--green-l);border-color:var(--green);color:var(--green-d); }

/* ── USER MENU ── */
.user-menu-card {
  display:flex;align-items:center;gap:14px;
  padding:14px;background:var(--bg2);border-radius:var(--r-sm);
}
.um-avatar { font-size:32px; }
.um-phone { font-family:var(--fn-display);font-size:16px;font-weight:700;color:var(--text); }
.um-since { font-size:11px;color:var(--text3);margin-top:2px; }
.um-info-row {
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;background:var(--green-l);border-radius:8px;
  font-size:12px;color:var(--green-d);font-weight:500;
}
.danger-btn {
  padding:9px 16px;border-radius:var(--r-xs);font-size:13px;font-weight:700;
  border:1.5px solid var(--red);background:var(--red-l);color:var(--red);
  cursor:pointer;transition:all .2s;width:100%;font-family:var(--fn-body);
}
.danger-btn:hover { background:var(--red);color:#fff; }

/* ── PROFILE DROPDOWN ── */
.profile-drop {
  position: fixed;
  top: calc(var(--head-h) + 8px);
  right: 12px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  padding: 16px;
  width: 240px;
  box-shadow: var(--shadow);
  z-index: 300;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px) scale(0.97);
  transition: all 0.2s;
}
.profile-drop.open {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0) scale(1);
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.profile-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--green-l);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
.profile-phone { font-size: 13px; font-weight: 600; color: var(--text); }
.profile-sync  { font-size: 11px; color: var(--green); margin-top: 2px; }
.profile-sep   { height: 1px; background: var(--border); margin-bottom: 10px; }
.profile-item  {
  display: flex; align-items: center; gap: 10px;
  width: 100%; padding: 9px 10px;
  border: none; background: none;
  border-radius: var(--r-xs);
  font-size: 13px; font-weight: 500;
  color: var(--text2); cursor: pointer;
  transition: background 0.15s;
  font-family: var(--fn-body);
}
.profile-item:hover { background: var(--bg2); }
.profile-item.danger { color: var(--red); }
.profile-item.danger:hover { background: var(--red-l); }
