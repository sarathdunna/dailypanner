/* TIMER.JS — Pomodoro timer with circular progress + FAB */
const TimerUI = (() => {

  const MODES = {
    focus: { label:'Focus Time',   seconds:25*60, color:'#10b981' },
    short: { label:'Short Break',  seconds:5*60,  color:'#3b82f6' },
    long:  { label:'Long Break',   seconds:15*60, color:'#f59e0b' },
  };

  let mode     = 'focus';
  let total    = MODES.focus.seconds;
  let left     = MODES.focus.seconds;
  let running  = false;
  let timer    = null;
  let sessions = 0;   // completed focus sessions

  const CIRC   = 2 * Math.PI * 95; // r=95 → ≈ 596.9

  /* ── OPEN / CLOSE ── */
  function open()  { document.getElementById('timerSheet').classList.add('open'); }
  function close() { document.getElementById('timerSheet').classList.remove('open'); }

  /* ── SET MODE ── */
  function setMode(m) {
    if(running) _stop();
    mode  = m;
    total = MODES[m].seconds;
    left  = total;
    _updateModeTabs();
    _updateRingColor();
    _render();
  }

  /* ── CUSTOM DURATION ── */
  function setCustom() {
    const v = parseInt(document.getElementById('timerCustom').value, 10);
    if(!v || v<1 || v>120) return;
    if(running) _stop();
    total = v * 60;
    left  = total;
    _render();
  }

  /* ── TOGGLE PLAY / PAUSE ── */
  function toggle() {
    if(running) _pause();
    else        _start();
  }

  function _start() {
    running = true;
    _updatePlayBtn();
    timer = setInterval(_tick, 1000);
  }

  function _pause() {
    running = false;
    _updatePlayBtn();
    clearInterval(timer);
    timer = null;
  }

  function _stop() {
    running = false;
    clearInterval(timer);
    timer = null;
    _updatePlayBtn();
  }

  /* ── TICK ── */
  function _tick() {
    if(left <= 0) {
      _stop();
      _onComplete();
      return;
    }
    left--;
    _render();
    _updateFAB();
  }

  /* ── ON COMPLETE ── */
  function _onComplete() {
    _beep();
    if(mode === 'focus') {
      sessions++;
      App.showToast('🎯 Focus session complete! Take a break.', 4000);
      // Auto-suggest break
      setTimeout(() => {
        setMode(sessions % 4 === 0 ? 'long' : 'short');
      }, 1000);
    } else {
      App.showToast('☀️ Break over! Time to focus.', 3000);
      setTimeout(() => setMode('focus'), 800);
    }
    _renderDots();
    _updateFAB();
  }

  /* ── RESET ── */
  function reset() {
    _stop();
    left  = total;
    _render();
    _updateFAB();
  }

  /* ── RENDER ── */
  function _render() {
    const m = String(Math.floor(left/60)).padStart(2,'0');
    const s = String(left % 60).padStart(2,'0');
    document.getElementById('timerDisplay').textContent = m+':'+s;
    document.getElementById('timerModeLbl').textContent = MODES[mode].label;

    // Ring progress
    const pct   = total > 0 ? left / total : 1;
    const offset = CIRC * (1 - pct);
    const ring   = document.getElementById('timerRing');
    if(ring) ring.style.strokeDashoffset = offset;

    _renderDots();
  }

  function _renderDots() {
    // 4 dots = one Pomodoro cycle
    const dots = document.getElementById('timerDots');
    if(!dots) return;
    dots.innerHTML = Array.from({length:4}, (_,i) => {
      let cls = 't-dot';
      if(i < sessions % 4) cls += ' done';
      else if(i === sessions % 4 && mode==='focus') cls += ' current';
      return `<div class="${cls}"></div>`;
    }).join('');
  }

  function _updateModeTabs() {
    ['focus','short','long'].forEach(m=>{
      document.getElementById('tm-'+m)?.classList.toggle('active', m===mode);
    });
  }

  function _updateRingColor() {
    const ring = document.getElementById('timerRing');
    if(ring) ring.style.stroke = MODES[mode].color;
  }

  function _updatePlayBtn() {
    const btn = document.getElementById('timerPlay');
    if(!btn) return;
    btn.textContent = running ? '⏸' : '▶';
    btn.classList.toggle('pause', running);
  }

  /* ── FAB UPDATE ── */
  function _updateFAB() {
    const fab  = document.getElementById('timerFab');
    const ico  = document.getElementById('fabIco');
    const txt  = document.getElementById('fabTxt');
    if(!fab) return;

    if(running || left < total) {
      const m = String(Math.floor(left/60)).padStart(2,'0');
      const s = String(left%60).padStart(2,'0');
      txt.textContent = m+':'+s;
      fab.classList.toggle('running', running);
      ico.textContent = running ? '⏸' : '⏱';
    } else {
      txt.textContent = '';
      fab.classList.remove('running');
      ico.textContent = '⏱';
    }
  }

  /* ── BEEP (Web Audio API) ── */
  function _beep() {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, ctx.currentTime);

      [[523.25, 0,   0.15],
       [659.25, 0.2, 0.15],
       [783.99, 0.4, 0.2]].forEach(([freq, start, dur]) => {
        const osc = ctx.createOscillator();
        osc.type      = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        osc.connect(gain);
        gain.gain.setValueAtTime(0.5, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur + 0.05);
      });
    } catch(e) {
      console.warn('Audio not available');
    }
  }

  /* ── INIT ── */
  function _init() {
    _render();
    _updateModeTabs();
    _updateRingColor();
    _updatePlayBtn();
    _updateFAB();

    // Close sheet when tapping overlay backdrop
    document.getElementById('timerSheet').addEventListener('click', function(e){
      if(e.target === this) close();
    });
  }

  _init();
  return { open, close, setMode, setCustom, toggle, reset };
})();
