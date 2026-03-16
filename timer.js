/* DATA.JS — All app data with syncKeys for cross-module sync */
const DATA = {

  /* syncKey mapping (shared across Today / Fitness / Habits) */
  SYNC_KEYS: {
    warm_water:       'Warm Water',
    morning_run:      'Morning Run',
    health_routine:   'Health Routine (Ginger-Garlic + Amla)',
    green_tea_1:      'Green Tea #1',
    breakfast_nuts:   'Breakfast (Dates + Nuts)',
    evening_routine:  'Evening Routine (Tea #2 + Seeds)',
    exam_prep:        'Govt Exam Prep',
    mtech_study:      'M.Tech Study',
    sleep_7hrs:       '7+ Hours Sleep',
  },

  /* Mon–Thu schedule */
  monThu: [
    { t:'5:15 AM', d:'15m',  name:'Wake Up — Drink 1 glass warm water',                cat:'health',  syncKey:'warm_water' },
    { t:'5:30 AM', d:'45m',  name:'Morning Run / Walk-Run (per running plan)',           cat:'fitness', syncKey:'morning_run' },
    { t:'6:20 AM', d:'20m',  name:'Cool-down stretches + Deep breathing',               cat:'fitness', syncKey:null },
    { t:'6:40 AM', d:'20m',  name:'Shower + Freshen Up',                                cat:'other',   syncKey:null },
    { t:'7:00 AM', d:'30m',  name:'Health Routine: Amla powder + Ginger-Garlic water',  cat:'health',  syncKey:'health_routine' },
    { t:'7:20 AM', d:'10m',  name:'Green Tea #1 (not on empty stomach)',                 cat:'health',  syncKey:'green_tea_1' },
    { t:'7:30 AM', d:'90m',  name:'Breakfast + Morning Revision (Dates, Almonds, Walnuts, Flax)', cat:'study', syncKey:'breakfast_nuts' },
    { t:'8:50 AM', d:'10m',  name:'Walk to College (7 min walk)',                       cat:'other',   syncKey:null },
    { t:'9:00 AM', d:'3h50', name:'College — Morning Session (lectures, labs)',          cat:'college', syncKey:null },
    { t:'12:50 PM',d:'10m',  name:'Quick Lunch at College Canteen / Mess',               cat:'health',  syncKey:null },
    { t:'1:00 PM', d:'4h',   name:'College — Afternoon Session (labs, projects)',        cat:'college', syncKey:null },
    { t:'5:00 PM', d:'10m',  name:'Walk Back to Hostel',                                 cat:'other',   syncKey:null },
    { t:'5:10 PM', d:'40m',  name:'Rest + Green Tea #2 + Pumpkin seeds snack',           cat:'health',  syncKey:'evening_routine' },
    { t:'5:50 PM', d:'90m',  name:'Govt Exam Prep — RRB / SSC / KVS (Maths/Reasoning/GK)', cat:'study', syncKey:'exam_prep' },
    { t:'7:20 PM', d:'10m',  name:'Walk to Library or Study Room',                       cat:'other',   syncKey:null },
    { t:'7:30 PM', d:'60m',  name:'Dinner + Short walk after eating',                    cat:'health',  syncKey:null },
    { t:'8:30 PM', d:'90m',  name:'M.Tech Academic Study — Library',                    cat:'study',   syncKey:'mtech_study' },
    { t:'10:00 PM',d:'30m',  name:'Daily Review: habit tracker + plan MIT tasks',        cat:'study',   syncKey:null },
    { t:'10:30 PM',d:'—',    name:'Sleep — minimum 7 hours (phone away 30 min before)', cat:'health',  syncKey:'sleep_7hrs' },
  ],

  saturday: [
    { t:'5:30 AM',  name:'Wake Up + Full Health Routine (no rush)',                   cat:'health',  syncKey:'health_routine' },
    { t:'6:00 AM',  name:'Morning Run (5 extra minutes on weekends)',                 cat:'fitness', syncKey:'morning_run' },
    { t:'7:00 AM',  name:'Yoga (20 min) + Meditation (10 min)',                       cat:'fitness', syncKey:null },
    { t:'7:30 AM',  name:'Breakfast + 15 min day planning',                           cat:'health',  syncKey:'breakfast_nuts' },
    { t:'9:00 AM',  name:'DEEP STUDY BLOCK 1: Quant / Aptitude (2 hrs)',              cat:'study',   syncKey:'exam_prep' },
    { t:'11:00 AM', name:'DEEP STUDY BLOCK 2: English + GK / Current Affairs (2 hrs)',cat:'study',   syncKey:null },
    { t:'1:00 PM',  name:'Lunch + Complete rest (30 min — no screens)',               cat:'health',  syncKey:null },
    { t:'2:00 PM',  name:'M.TECH BLOCK: Theory revision / research papers (2 hrs)',   cat:'study',   syncKey:'mtech_study' },
    { t:'4:00 PM',  name:'Green Tea Break (15 min — pure break)',                     cat:'health',  syncKey:'green_tea_1' },
    { t:'4:15 PM',  name:'DEEP STUDY BLOCK 4: Weakest subject focus (45 min)',        cat:'study',   syncKey:null },
    { t:'5:00 PM',  name:'Evening Workout (Phase 2) OR brisk walk',                   cat:'fitness', syncKey:null },
    { t:'6:00 PM',  name:'KVS Teaching Aptitude / Light revision (1 hr)',             cat:'study',   syncKey:null },
    { t:'7:30 PM',  name:'Dinner + Short walk',                                       cat:'health',  syncKey:null },
    { t:'8:30 PM',  name:'Library — M.Tech project / deep work',                     cat:'study',   syncKey:'mtech_study' },
    { t:'10:00 PM', name:'Review weekly progress',                                    cat:'study',   syncKey:null },
    { t:'10:30 PM', name:'Sleep',                                                     cat:'health',  syncKey:'sleep_7hrs' },
  ],

  sunday: [
    { t:'5:30 AM',  name:'Easy jog / active recovery walk + Yoga 20 min',            cat:'fitness', syncKey:'morning_run' },
    { t:'7:00 AM',  name:'Full health ritual (ginger-garlic, amla, green tea, breakfast)', cat:'health', syncKey:'health_routine' },
    { t:'9:00 AM',  name:'Library — M.Tech subjects / research (till 12:30)',        cat:'study',   syncKey:'mtech_study' },
    { t:'12:30 PM', name:'Lunch + Rest',                                              cat:'health',  syncKey:null },
    { t:'2:00 PM',  name:'KVS Teaching Aptitude study (CTET material — 1 hr)',       cat:'study',   syncKey:null },
    { t:'3:00 PM',  name:'FULL MOCK TEST (RRB / SSC / KVS — 2 hours)',               cat:'exam',    syncKey:'exam_prep' },
    { t:'5:00 PM',  name:'Weekly Reset: clean room, laundry, organise notes',        cat:'other',   syncKey:null },
    { t:'5:30 PM',  name:'Plan next week: schedule, exam targets, running plan',     cat:'study',   syncKey:null },
    { t:'6:00 PM',  name:'Light revision only — no new topics on Sunday',            cat:'study',   syncKey:null },
    { t:'7:30 PM',  name:'Dinner + Family / friends call (social recharge!)',        cat:'health',  syncKey:null },
    { t:'8:30 PM',  name:'Weekly review + update habit tracker',                     cat:'study',   syncKey:null },
    { t:'10:00 PM', name:'Early sleep to power up for Monday',                       cat:'health',  syncKey:'sleep_7hrs' },
  ],

  /* Health items — syncKeys match Today slots */
  healthItems: [
    { name:'Warm Water (Empty Stomach)',                    time:'5:15 AM',     benefit:'Hydration kickstart, flushes toxins',            syncKey:'warm_water' },
    { name:'Ginger-Garlic Water',                          time:'5:15–5:30 AM',benefit:'Immunity, anti-inflammatory, natural energy',     syncKey:'health_routine' },
    { name:'Morning Run / Walk-Run',                       time:'5:30 AM',     benefit:'Cardiovascular fitness, endorphins, mood boost',  syncKey:'morning_run' },
    { name:'Amla Powder in Lukewarm Water',                time:'7:00 AM',     benefit:'Highest Vit-C, antioxidant, memory booster',     syncKey:'health_routine' },
    { name:'Green Tea #1',                                 time:'7:20 AM',     benefit:'Focus, mild caffeine, metabolism boost',          syncKey:'green_tea_1' },
    { name:'Breakfast: Dates + Soaked Almonds + Walnuts + Ground Flax', time:'7:30 AM', benefit:'Brain fuel, Omega-3, sustained energy', syncKey:'breakfast_nuts' },
    { name:'Pumpkin Seeds Snack',                          time:'10 AM / 5 PM',benefit:'Magnesium (stress buster), zinc, better sleep',  syncKey:'evening_routine' },
    { name:'Green Tea #2 (Evening)',                       time:'5:10 PM',     benefit:'Afternoon alertness, antioxidants',               syncKey:'evening_routine' },
  ],

  /* Habits — syncKeys for today's column auto-sync */
  habits: [
    { name:'Morning Run / Walk-Run',                color:'on-g', syncKey:'morning_run' },
    { name:'Health Routine (Ginger-Garlic + Amla)', color:'on-a', syncKey:'health_routine' },
    { name:'Govt Exam Study Block',                 color:'on-b', syncKey:'exam_prep' },
    { name:'M.Tech Study Block',                    color:'on-b', syncKey:'mtech_study' },
    { name:'7+ Hours Sleep',                        color:'on-g', syncKey:'sleep_7hrs' },
    { name:'Hydration (2.5L water)',                color:'on-g', syncKey:null },
    { name:'Family / Friend Connect (10 min)',      color:'on-a', syncKey:null },
  ],

  days7: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

  /* Running plan */
  phase1: [
    { w:'Week 1',    mwf:'Walk 4 min → Jog 1 min × 4 sets',    tth:'Walk 5 min → Jog 1 min × 3 sets',    sat:'30 min brisk walk',       focus:'Zero pressure — get body moving' },
    { w:'Week 2',    mwf:'Walk 3 min → Jog 2 min × 4 sets',    tth:'Walk 4 min → Jog 2 min × 4 sets',    sat:'35 min brisk walk',       focus:'Increase jog intervals' },
    { w:'Week 3',    mwf:'Walk 2 min → Jog 3 min × 5 sets',    tth:'Walk 3 min → Jog 3 min × 4 sets',    sat:'20 min easy jog + 10 walk',focus:'Smile test!' },
    { w:'Week 4',    mwf:'Walk 2 min → Jog 5 min × 4 sets',    tth:'Walk 2 min → Jog 5 min × 3 sets',    sat:'25 min continuous jog',   focus:'Building continuous running' },
    { w:'Week 5',    mwf:'30 min easy continuous jog',          tth:'25 min easy jog',                    sat:'30 min easy jog',         focus:'Comfortable sustainable pace' },
    { w:'Week 6',    mwf:'35 min easy jog',                     tth:'30 min easy jog',                    sat:'35 min slightly faster',  focus:'Phase 1 done! Great work!' },
  ],
  phase2: [
    { w:'Week 7',      mwf:'Morning: 35 min · Evening: 30 min yoga',          tth:'Morning: 30 min · Evening: REST',         sat:'40 min run', focus:'Start evening gently' },
    { w:'Week 8',      mwf:'Morning: 40 min · Evening: 30 min bodyweight',    tth:'Morning: 35 min · Evening: 20 min yoga',  sat:'40 min run', focus:'Core strength added' },
    { w:'Week 9',      mwf:'Morning: 40 min · Evening: 35 min strength',      tth:'Morning: 35 min · Evening: 25 min yoga',  sat:'45 min run', focus:'Solid routine established' },
    { w:'Weeks 10–12', mwf:'Morning: 40–45 min · Evening: 35–45 min workout', tth:'Morning: 35–40 min · Evening: 25–30 yoga',sat:'50 min run', focus:'Maintain + add pace gradually' },
  ],

  subjects: [
    { name:'Quantitative Aptitude', pct:90, rrb:'High',      ssc:'Very High', kvs:'Medium',    weekly:'~6h',  color:'#10b981' },
    { name:'Reasoning',             pct:88, rrb:'Very High', ssc:'Very High', kvs:'High',      weekly:'~5h',  color:'#3b82f6' },
    { name:'English Language',      pct:70, rrb:'Medium',    ssc:'Very High', kvs:'High',      weekly:'~3.5h',color:'#8b5cf6' },
    { name:'GK + Current Affairs',  pct:75, rrb:'Very High', ssc:'High',      kvs:'High',      weekly:'~2.5h',color:'#f59e0b' },
    { name:'Computer Science (CS)', pct:85, rrb:'Medium',    ssc:'Medium',    kvs:'Very High', weekly:'M.Tech',color:'#ef4444' },
    { name:'Teaching Aptitude',     pct:50, rrb:'N/A',       ssc:'N/A',       kvs:'High',      weekly:'~1.5h',color:'#06b6d4' },
  ],

  roadmap: [
    { phase:'Month 1–2: Foundation',     desc:'Build basics: NCERT Maths 6–10, Reasoning fundamentals, Lucent GK. Daily 20-min current affairs. No mocks yet — understand concepts deeply.', active:true },
    { phase:'Month 3: Practice Start',   desc:'Start 1 sectional mock test every Sunday. Practice 30+ questions daily. Increase English newspaper reading.' },
    { phase:'Month 4: Intensify',        desc:'Full mock tests every Sunday. Target weak areas. Add KVS Teaching Aptitude. Revise monthly GK capsules.' },
    { phase:'Month 5: Speed + Accuracy', desc:'2 mocks per week. Target 90 sec/question for Maths. Analyse Previous Year Questions (PYQ) systematically.' },
    { phase:'Month 6: Exam Ready',       desc:'Full revision. Daily mocks. Current affairs — last 6 months only. Stay calm, maintain full health routine.' },
  ],

  weeklyStudy: {
    headers:['Subject','Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    rows:[
      ['Quant',    '1h 7:30AM','—','1h 5:50PM','—','1h 7:30AM','2h Blk1','1h Rev'],
      ['Reasoning','—','1h 5:50PM','—','1h 7:30AM','1h 5:50PM','2h Blk2','Mock'],
      ['English',  '30m','30m','30m','30m','30m','1h','30m'],
      ['GK',       '20m','20m','20m','20m','20m','30m','30m'],
      ['M.Tech',   '1.5h','1.5h','1.5h','1.5h','1.5h','2h','1.5h'],
      ['KVS Apt.', '—','—','30m','—','—','—','1h'],
    ]
  },

  resources: [
    { name:'R.S. Aggarwal — Quant',       use:'Best Maths practice · All exams',   cost:'book' },
    { name:'NCERT Maths Class 6–10',      use:'Foundation Maths · RRB + SSC',      cost:'free' },
    { name:'M.K. Pandey — Reasoning',     use:'Best reasoning book · All exams',   cost:'book' },
    { name:'Wren & Martin Grammar',       use:'Grammar reference · All exams',     cost:'book' },
    { name:'Lucent\'s General Knowledge', use:'Static GK bible · All exams',       cost:'book' },
    { name:'Testbook / Adda247 App',      use:'Mock tests + PYQs · RRB/SSC/KVS',  cost:'free' },
    { name:'GeeksforGeeks.org',           use:'CS knowledge · KVS CS PGT',         cost:'free' },
    { name:'Adda247 Monthly GK PDF',      use:'Current affairs · All exams',       cost:'free' },
  ],

  aiPrompts: [
    '⏰ Optimise my study time',
    '🏃 Running consistency tips',
    '📊 Analyse my schedule gaps',
    '😴 Improve sleep quality',
    '🎯 KVS PGT strategy',
    '🌿 Best morning routine order',
  ],

  aiSystem:`You are a personal life coach and academic advisor for an M.Tech student named NT who is simultaneously:
1. Pursuing M.Tech degree (College Mon–Thu 9AM–5PM, Library Mon–Sat till 10PM, Sun 9AM–5PM)
2. Preparing for: RRB NTPC, SSC CGL/CHSL, KVS PGT Computer Science
3. Following a beginner running plan (hadn't run for 1.5 years) — Phase 1: morning only (Day 1-45), Phase 2: morning + evening (Day 46+)
4. Daily health routine: ginger-garlic water, amla, green tea ×2, dates, almonds, walnuts, pumpkin seeds, flax seeds

Key facts: M.Tech qualifies for KVS PGT. Study blocks: Exam prep 5:50–7:20PM, M.Tech 8:30–10PM on college days. Start date: March 23 2025.

Give concise, practical, motivating advice in 2–4 paragraphs. Use encouraging tone. Be specific to this person's situation.`
};
