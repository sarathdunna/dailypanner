/* =============================================
   AI.JS — Claude AI chat for routine analysis
   ============================================= */

const AI = (() => {

  const history = [];
  let busy = false;

  function init() {
    // Render quick prompt buttons
    document.getElementById('aiQuickBtns').innerHTML = DATA.aiQuickPrompts.map(p =>
      `<button class="ai-quick-btn" onclick="AI.quickSend(this)">${p}</button>`
    ).join('');
  }

  function quickSend(btn) {
    document.getElementById('aiInput').value = btn.textContent.replace(/^[^\s]+\s/, '');
    send();
  }

  async function send() {
    if (busy) return;
    const inp  = document.getElementById('aiInput');
    const text = inp.value.trim();
    if (!text) return;

    inp.value = '';
    busy = true;
    toggleBtn(true);

    // Add user message
    addMsg('user', text);
    history.push({ role: 'user', content: text });

    // Typing indicator
    const typingId = 'typing_' + Date.now();
    addTyping(typingId);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'x-api-key': 'sk-ant-YOUR_KEY_HERE',
           'anthropic-version': '2023-06-01',
           'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: DATA.systemContext,
          messages: history,
        }),
      });

      const data = await response.json();
      removeTyping(typingId);

      if (data.error) {
        addMsg('bot', '⚠️ ' + (data.error.message || 'API error. Please check your connection.'));
        history.pop();
      } else {
        const reply = data.content.find(b => b.type === 'text')?.text || 'Sorry, no response.';
        addMsg('bot', reply);
        history.push({ role: 'assistant', content: reply });
      }
    } catch (err) {
      removeTyping(typingId);
      addMsg('bot', '⚠️ Connection error. Make sure you have internet access and the API is reachable.');
      history.pop();
      console.error(err);
    }

    busy = false;
    toggleBtn(false);
  }

  function addMsg(role, text) {
    const chat = document.getElementById('aiChat');
    const isUser = role === 'user';
    const div = document.createElement('div');
    div.className = 'ai-msg ' + (isUser ? 'ai-msg-user' : '');
    div.innerHTML = `
      <div class="ai-avatar">${isUser ? '👤' : '🤖'}</div>
      <div class="ai-bubble">${formatText(text)}</div>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function addTyping(id) {
    const chat = document.getElementById('aiChat');
    const div = document.createElement('div');
    div.className = 'ai-msg ai-typing';
    div.id = id;
    div.innerHTML = '<div class="ai-avatar">🤖</div><div class="ai-bubble">Thinking…</div>';
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function toggleBtn(loading) {
    const btn = document.getElementById('aiSendBtn');
    btn.disabled = loading;
    document.getElementById('aiSendIcon').textContent = loading ? '⏳' : '➤';
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>').replace(/$/, '</p>');
  }

  init();
  return { send, quickSend };

})();
