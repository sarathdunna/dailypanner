/* =============================================
   DATA.JS — All static data for NT Life Plan
   ============================================= */

const DATA = {

  /* ─── SCHEDULE: Mon–Thu ─── */
  monThu: [
    { t:'5:15 AM', d:'15m', name:'Wake Up — Drink 1 glass warm water', cat:'health' },
    { t:'5:30 AM', d:'45m', name:'Morning Run / Walk-Run (per running plan)', cat:'fitness' },
    { t:'6:20 AM', d:'20m', name:'Cool-down stretches + Deep breathing', cat:'fitness' },
    { t:'6:40 AM', d:'20m', name:'Shower + Freshen Up', cat:'other' },
    { t:'7:00 AM', d:'20m', name:'Health Routine: Amla powder, prepare breakfast', cat:'health' },
    { t:'7:20 AM', d:'10m', name:'Green Tea #1 (not on empty stomach)', cat:'health' },
    { t:'7:30 AM', d:'90m', name:'Breakfast + Morning Revision (Dates, Almonds, Walnuts, Flax)', cat:'study' },
    { t:'8:50 AM', d:'10m', name:'Walk to College (7 min walk)', cat:'other' },
    { t:'9:00 AM', d:'3h 50m', name:'College — Morning Session (lectures, labs, seminars)', cat:'college' },
    { t:'12:50 PM', d:'10m', name:'Quick Lunch at College Canteen / Mess', cat:'health' },
    { t:'1:00 PM', d:'4h', name:'College — Afternoon Session (labs, project, seminars)', cat:'college' },
    { t:'5:00 PM', d:'10m', name:'Walk Back to Hostel', cat:'other' },
    { t:'5:10 PM', d:'40m', name:'Rest + Green Tea #2 + Pumpkin seeds snack', cat:'health' },
    { t:'5:50 PM', d:'90m', name:'Govt Exam Prep — RRB / SSC / KVS (Maths/Reasoning/GK)', cat:'study' },
    { t:'7:20 PM', d:'10m', name:'Walk to Library or stay in study room', cat:'other' },
    { t:'7:30 PM', d:'60m', name:'Dinner + Short walk after eating', cat:'health' },
    { t:'8:30 PM', d:'90m', name:'M.Tech Academic Study — Library', cat:'study' },
    { t:'10:00 PM', d:'30m', name:'Daily Review: tick habit tracker, plan tomorrow\'s MIT tasks', cat:'study' },
    { t:'10:30 PM', d:'—', name:'Sleep — minimum 7 hours (phone away 30 min before)', cat:'health' },
  ],

  saturday: [
    { t:'5:30 AM', name:'Wake + Health Routine (full, no rush)', cat:'health' },
    { t:'6:00 AM', name:'Morning Run (add 5 extra minutes on weekends)', cat:'fitness' },
    { t:'7:00 AM', name:'Yoga (20 min) + Meditation (10 min)', cat:'fitness' },
    { t:'7:30 AM', name:'Breakfast + 15 min day planning', cat:'health' },
    { t:'9:00 AM', name:'DEEP STUDY BLOCK 1: Quant / Aptitude (2 hrs)', cat:'study' },
    { t:'11:00 AM', name:'DEEP STUDY BLOCK 2: English + GK / Current Affairs (2 hrs)', cat:'study' },
    { t:'1:00 PM', name:'Lunch + Complete rest (30 min — no screens at all)', cat:'health' },
    { t:'2:00 PM', name:'M.TECH BLOCK: Theory revision / research papers (2 hrs)', cat:'study' },
    { t:'4:00 PM', name:'Green Tea Break (15 min — zero study, pure break)', cat:'health' },
    { t:'4:15 PM', name:'DEEP STUDY BLOCK 4: Weakest subject focus (45 min)', cat:'study' },
    { t:'5:00 PM', name:'Evening Workout (Phase 2) OR brisk walk + freshen up', cat:'fitness' },
    { t:'6:00 PM', name:'KVS Teaching Aptitude / Light revision (1 hr)', cat:'study' },
    { t:'7:30 PM', name:'Dinner + Short walk', cat:'health' },
    { t:'8:30 PM', name:'Library — M.Tech project / deep work', cat:'study' },
    { t:'10:00 PM', name:'Review weekly progress. What was covered? What gap remains?', cat:'study' },
    { t:'10:30 PM', name:'Sleep', cat:'health' },
  ],

  sunday: [
    { t:'5:30 AM', name:'Easy jog / active recovery walk + Yoga 20 min', cat:'fitness' },
    { t:'7:00 AM', name:'Full health ritual (ginger-garlic, amla, green tea, breakfast)', cat:'health' },
    { t:'9:00 AM', name:'Library — M.Tech subjects / research (till 12:30)', cat:'study' },
    { t:'12:30 PM', name:'Lunch + Rest', cat:'health' },
    { t:'2:00 PM', name:'KVS Teaching Aptitude study (CTET material / Pedagogy — 1 hr)', cat:'study' },
    { t:'3:00 PM', name:'FULL MOCK TEST (RRB / SSC / KVS — 2 hours, from Month 3)', cat:'exam' },
    { t:'5:00 PM', name:'Weekly Reset: clean room, laundry, organise notes', cat:'other' },
    { t:'5:30 PM', name:'Plan next week: study schedule, exam targets, running plan', cat:'study' },
    { t:'6:00 PM', name:'Light revision only — no new topics on Sunday evening', cat:'study' },
    { t:'7:30 PM', name:'Dinner + Family / friends call (social recharge — very important!)', cat:'health' },
    { t:'8:30 PM', name:'Weekly review: What went well? Needs improvement? Update tracker', cat:'study' },
    { t:'10:00 PM', name:'Early sleep to power up for Monday', cat:'health' },
  ],

  /* ─── HEALTH ITEMS ─── */
  healthItems: [
    { name:'Warm Water (Empty Stomach)',     time:'5:15 AM',     benefit:'Hydration kickstart, flushes toxins' },
    { name:'Ginger-Garlic Water',            time:'5:15–5:30 AM',benefit:'Immunity, anti-inflammatory, natural energy' },
    { name:'Morning Run / Walk-Run',         time:'5:30 AM',     benefit:'Cardiovascular fitness, endorphins, mood boost' },
    { name:'Amla Powder in Lukewarm Water',  time:'7:00 AM',     benefit:'Highest Vit-C, antioxidant, memory booster' },
    { name:'Green Tea #1',                   time:'7:20 AM',     benefit:'Focus, mild caffeine, metabolism boost' },
    { name:'Breakfast: Dates + Soaked Almonds + Walnuts + Ground Flax',
                                             time:'7:30 AM',     benefit:'Brain fuel, Omega-3, sustained energy, no crash' },
    { name:'Pumpkin Seeds Snack',            time:'10 AM / 5 PM',benefit:'Magnesium (stress buster), zinc, better sleep' },
    { name:'Green Tea #2',                   time:'5:10 PM',     benefit:'Afternoon alertness, antioxidants' },
  ],

  /* ─── HABITS ─── */
  habits: [
    { name:'Morning Run / Walk-Run',                 color:'green' },
    { name:'Health Routine (Ginger-Garlic + Amla)',  color:'amber' },
    { name:'Govt Exam Study Block',                  color:'blue' },
    { name:'M.Tech Study Block',                     color:'blue' },
    { name:'7+ Hours Sleep',                         color:'green' },
    { name:'Hydration (2.5L water)',                 color:'green' },
    { name:'Family / Friend Connect (10 min)',        color:'amber' },
  ],

  days7: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

  /* ─── RUNNING PLAN ─── */
  phase1: [
    { w:'Week 1', mwf:'Walk 4 min → Jog 1 min × 4 sets', tth:'Walk 5 min → Jog 1 min × 3 sets', sat:'30 min brisk walk', focus:'Zero pressure — get body moving' },
    { w:'Week 2', mwf:'Walk 3 min → Jog 2 min × 4 sets', tth:'Walk 4 min → Jog 2 min × 4 sets', sat:'35 min brisk walk', focus:'Increase jog intervals' },
    { w:'Week 3', mwf:'Walk 2 min → Jog 3 min × 5 sets', tth:'Walk 3 min → Jog 3 min × 4 sets', sat:'20 min easy jog + 10 min walk', focus:'Smile test!' },
    { w:'Week 4', mwf:'Walk 2 min → Jog 5 min × 4 sets', tth:'Walk 2 min → Jog 5 min × 3 sets', sat:'25 min continuous easy jog', focus:'Building continuous running' },
    { w:'Week 5', mwf:'30 min easy continuous jog', tth:'25 min easy jog', sat:'30 min easy jog', focus:'Comfortable sustainable pace' },
    { w:'Week 6', mwf:'35 min easy jog', tth:'30 min easy jog', sat:'35 min slightly faster', focus:'Phase 1 complete! Great work!' },
  ],

  phase2: [
    { w:'Week 7',    mwf:'Morning: 35 min run · Evening: 30 min yoga', tth:'Morning: 30 min · Evening: REST', sat:'40 min run', focus:'Start evening gently' },
    { w:'Week 8',    mwf:'Morning: 40 min run · Evening: 30 min bodyweight', tth:'Morning: 35 min · Evening: 20 min yoga', sat:'40 min run', focus:'Core strength added' },
    { w:'Week 9',    mwf:'Morning: 40 min run · Evening: 35 min strength/cycling', tth:'Morning: 35 min · Evening: 25 min yoga', sat:'45 min long run', focus:'Solid routine established' },
    { w:'Weeks 10–12', mwf:'Morning: 40–45 min run · Evening: 35–45 min workout', tth:'Morning: 35–40 min · Evening: 25–30 min yoga', sat:'50 min long run', focus:'Maintain + add pace gradually' },
  ],

  /* ─── EXAM SUBJECTS ─── */
  subjects: [
    { name:'Quantitative Aptitude', pct:90, rrb:'High', ssc:'Very High', kvs:'Medium', weekly:'~6h', yearly:'~300h', color:'#2db87c' },
    { name:'Reasoning',             pct:90, rrb:'Very High', ssc:'Very High', kvs:'High', weekly:'~5h', yearly:'~260h', color:'#4c7ff0' },
    { name:'English Language',      pct:70, rrb:'Medium', ssc:'Very High', kvs:'High', weekly:'~3.5h', yearly:'~180h', color:'#7c5cfc' },
    { name:'GK + Current Affairs',  pct:75, rrb:'Very High', ssc:'High', kvs:'High', weekly:'~2.5h', yearly:'~130h', color:'#f59c1a' },
    { name:'Computer Science (CS)', pct:85, rrb:'Medium', ssc:'Medium', kvs:'Very High', weekly:'M.Tech notes', yearly:'Advantage!', color:'#f04b6a' },
    { name:'Teaching Aptitude',     pct:50, rrb:'N/A', ssc:'N/A', kvs:'High', weekly:'~1.5h', yearly:'~75h', color:'#00b8d4' },
  ],

  roadmap: [
    { phase:'Month 1–2: Foundation',  desc:'Build basics: NCERT Maths 6–10, Reasoning fundamentals, Lucent GK. Start daily 20-min current affairs. No mocks yet — understand concepts deeply.', active:true },
    { phase:'Month 3: Practice Start',desc:'Start 1 sectional mock test every Sunday. Practice 30+ questions daily (Maths + Reasoning). Increase English newspaper reading pace.' },
    { phase:'Month 4: Intensify',     desc:'Full mock tests every Sunday. Target weak areas. Add KVS Teaching Aptitude. Revise monthly GK capsules.' },
    { phase:'Month 5: Speed + Accuracy', desc:'2 mocks per week. Work on speed: target 90 sec/question for Maths. Analyse Previous Year Questions (PYQ) systematically.' },
    { phase:'Month 6: Exam Ready',    desc:'Full revision of all subjects. Daily mocks. Current affairs — last 6 months only. Stay calm, maintain full health routine.' },
  ],

  weeklyStudy: {
    headers: ['Subject','Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    rows: [
      ['Quant Aptitude', '1h 7:30AM','—','1h 5:50PM','—','1h 7:30AM','2h Blk1','1h Rev'],
      ['Reasoning',      '—','1h 5:50PM','—','1h 7:30AM','1h 5:50PM','2h Blk2','Mock'],
      ['English',        '30m','30m Vocab','30m','30m Grammar','30m Vocab','1h Blk2','30m'],
      ['GK+Current',     '20m','20m','20m','20m','20m','30m GK','30m Quiz'],
      ['M.Tech',         '1.5h 8:30PM','1.5h','1.5h','1.5h','1.5h','2h Blk3','1.5h Lib'],
      ['KVS Aptitude',   '—','—','30m','—','—','—','1h 2-3PM'],
    ]
  },

  resources: [
    { name:'R.S. Aggarwal — Quantitative Aptitude', use:'Best Maths practice book · All exams', cost:'book' },
    { name:'NCERT Maths Class 6–10', use:'Foundation for all Maths · RRB + SSC', cost:'free' },
    { name:'M.K. Pandey — Reasoning', use:'Best reasoning book · All exams', cost:'book' },
    { name:'Wren & Martin English Grammar', use:'Grammar reference · All exams', cost:'book' },
    { name:'Lucent\'s General Knowledge', use:'Static GK bible · All exams', cost:'book' },
    { name:'Testbook / Adda247 App', use:'Mock tests + PYQs · RRB/SSC/KVS', cost:'free' },
    { name:'GeeksforGeeks.org', use:'CS subject knowledge · KVS CS PGT', cost:'free' },
    { name:'Adda247 Monthly GK PDF', use:'Current affairs digest · All exams', cost:'free' },
    { name:'YouTube: Let\'s Crack SSC / Unacademy', use:'Free video lectures · All exams', cost:'free' },
  ],

  /* ─── AI QUICK PROMPTS ─── */
  aiQuickPrompts: [
    '⏰ How to optimise my study time?',
    '🏃 Tips for running consistency?',
    '📊 Analyse my current schedule gaps',
    '😴 How to improve sleep quality?',
    '🎯 KVS PGT exam strategy?',
    '🌿 Best health routine order?',
  ],

  /* ─── SYSTEM CONTEXT (for AI) ─── */
  systemContext: `You are a personal life coach and academic advisor for an M.Tech student named NT who is simultaneously:
1. Pursuing M.Tech degree (College Mon–Thu 9AM–5PM, Library Mon–Sat till 10PM, Sun Library 9AM–5PM)
2. Preparing for Govt Exams: RRB NTPC, SSC CGL/CHSL, KVS PGT Computer Science
3. Following a beginner-to-intermediate running plan (hadn't run for 1.5 years)
4. Following a daily health routine (ginger-garlic water, amla, green tea, dates, almonds, walnuts, pumpkin seeds, flax seeds)

Key facts:
- M.Tech qualifies for KVS PGT (Master's degree required)
- Phase 1 (Day 1-45): Morning run only · Phase 2 (Day 46+): Morning + Evening workout
- Study blocks: Govt exam prep 5:50–7:20PM, M.Tech study 8:30–10PM on college days
- Saturday: Deep study blocks (no college) · Sunday: Recovery + Mock test
- Start date: March 23, 2025

Give personalised, practical, motivating advice. Be concise (2-4 paragraphs). Use encouraging tone.`
};
