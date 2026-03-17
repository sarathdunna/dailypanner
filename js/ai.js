/* AI.JS — Claude AI coach */
const AI = (() => {
  const history=[];
  let busy=false;

  function _init() {
    document.getElementById('aiQuickBtns').innerHTML=DATA.aiPrompts.map(p=>
      `<button class="quick-btn" onclick="AI.quick(this)">${p}</button>`).join('');
  }

  function quick(btn) {
    document.getElementById('aiInput').value=btn.textContent.replace(/^[^\s]+\s/,'');
    send();
  }

  async function send() {
    if(busy) return;
    const inp=document.getElementById('aiInput');
    const text=inp.value.trim();
    if(!text) return;
    inp.value=''; busy=true;
    _setBusy(true);
    _addMsg('user',text);
    history.push({role:'user',content:text});
    const tid='t'+Date.now();
    _addTyping(tid);
    try {
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:DATA.aiSystem,
          messages:history,
        }),
      });
      const data=await res.json();
      _removeTyping(tid);
      if(data.error){
        _addMsg('bot','⚠️ '+( data.error.message||'API error. Check your connection.'));
        history.pop();
      } else {
        const reply=data.content?.find(b=>b.type==='text')?.text||'No response.';
        _addMsg('bot',reply);
        history.push({role:'assistant',content:reply});
      }
    } catch(e) {
      _removeTyping(tid);
      _addMsg('bot','⚠️ Connection error. Make sure you have internet access.');
      history.pop();
      console.error(e);
    }
    busy=false; _setBusy(false);
  }

  function _addMsg(role,text) {
    const chat=document.getElementById('aiChat');
    const isUser=role==='user';
    const d=document.createElement('div');
    d.className='chat-msg'+(isUser?' user':'');
    d.innerHTML=`<div class="chat-av">${isUser?'👤':'🤖'}</div>
      <div class="chat-bubble">${_fmt(text)}</div>`;
    chat.appendChild(d);
    chat.scrollTop=chat.scrollHeight;
  }

  function _addTyping(id) {
    const chat=document.getElementById('aiChat');
    const d=document.createElement('div');
    d.className='chat-msg typing'; d.id=id;
    d.innerHTML='<div class="chat-av">🤖</div><div class="chat-bubble">Thinking…</div>';
    chat.appendChild(d); chat.scrollTop=chat.scrollHeight;
  }

  function _removeTyping(id) { const e=document.getElementById(id); if(e) e.remove(); }

  function _setBusy(b) {
    const btn=document.getElementById('aiSendBtn');
    btn.disabled=b;
    document.getElementById('aiSendIcon').textContent=b?'⏳':'➤';
  }

  function _fmt(t) {
    return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.*?)\*/g,'<em>$1</em>')
      .replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')
      .replace(/^/,'<p>').replace(/$/,'</p>');
  }

  _init();
  return {send,quick};
})();
