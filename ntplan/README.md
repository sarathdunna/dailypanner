# NT Life Plan — Personal Lifestyle App

A complete daily lifestyle management app for M.Tech students preparing for Govt Exams.

## Features
- ☀️ **Today Page** — Today's schedule as interactive checklist with current task highlight
- 📅 **Calendar** — Month calendar with per-day TODO lists and checkboxes
- ✅ **Habits** — 7-day habit streak tracker + MIT (Most Important Tasks)
- 🏃 **Fitness** — 12-week running plan + daily health checklist
- 📚 **Exams** — Subject priority, 6-month roadmap, weekly schedule, resources
- 🤖 **AI Analysis** — Claude AI analyses your routine (requires API access)
- 🔔 **Reminders** — Dynamic reminders with repeat options (daily/weekdays/weekends/once)
- 🌙 **Dark / Light Mode** — Toggle in top-right corner
- 💾 **Persistent Storage** — All data saved to localStorage

---

## File Structure

```
ntplan/
├── index.html          # Main HTML
├── css/
│   └── style.css       # All styles (light + dark mode)
├── js/
│   ├── data.js         # All static data (schedule, health, exams)
│   ├── app.js          # Core: init, routing, clock, theme
│   ├── calendar.js     # Calendar TODO module
│   ├── habits.js       # Habit tracker + MIT tasks
│   ├── fitness.js      # Running plan + health checklist
│   ├── exams.js        # Exam prep, roadmap, resources
│   ├── ai.js           # Claude AI chat integration
│   └── reminders.js    # Dynamic reminders system
└── README.md
```

---

## Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (green button)
3. Name it: `nt-life-plan`
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2 — Upload your files

**Option A — GitHub Web UI (easiest):**
1. In your new repo, click **"Add file" → "Upload files"**
2. Upload all files maintaining the folder structure:
   - `index.html`
   - `css/style.css`
   - `js/data.js`, `js/app.js`, `js/calendar.js`, `js/habits.js`, `js/fitness.js`, `js/exams.js`, `js/ai.js`, `js/reminders.js`
3. Click **"Commit changes"**

**Option B — Git CLI:**
```bash
git init
git add .
git commit -m "Initial commit: NT Life Plan app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nt-life-plan.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** tab
2. Scroll to **"Pages"** in the left sidebar
3. Under "Source", select **"Deploy from a branch"**
4. Select branch: **main** · folder: **/ (root)**
5. Click **Save**

### Step 4 — Access your app

After 1–2 minutes, your app will be live at:
```
https://YOUR_USERNAME.github.io/nt-life-plan/
```

---

## AI Feature Setup

The AI tab uses the Anthropic Claude API. The API key is handled server-side via Anthropic's proxy when accessed through Claude.ai.

If deploying standalone, you need to add your API key. In `js/ai.js`, find the fetch call and add your key:

```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_API_KEY_HERE',           // Add this
  'anthropic-version': '2023-06-01',           // Add this
  'anthropic-dangerous-direct-browser-access': 'true'  // Required for browser
},
```

⚠️ **Security note:** Never expose API keys in public GitHub repos. For production, use a backend proxy.

---

## Customisation

- Edit `js/data.js` to change schedule, habits, health items, or exam data
- Change accent colors in `css/style.css` under `:root` (look for `--accent`)
- Start date is set in `js/app.js` as `new Date('2025-03-23')` — update if needed

---

## Built With

- Vanilla HTML, CSS, JavaScript (no frameworks — works offline!)
- Google Fonts: Syne + DM Sans
- Anthropic Claude API (for AI tab)
- localStorage for all data persistence

---

*Start Date: March 23, 2025 · Review every Sunday · Always keep moving forward 💪*
