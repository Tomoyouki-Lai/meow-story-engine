const SAVE_PREFIX = 'nyan_alpha_v2_';
const UNLOCK_KEY = 'nyan_story_unlocks';

const COUNTDOWN_MODE = 'OFF'; 
const TURN_INTERVAL_MS = 2 * 60 * 60 * 1000;
const TURNS_PER_INTERVAL = 3;
const MAX_AVAILABLE_TURNS = 12;
const MAX_ACTIVE_PLAYERS = 4;

const STAT_CONFIG = {
    happy: { icon: '❤️', name: 'Happy' },
    food: { icon: '🐟', name: 'Food' },
    energy: { icon: '⚡', name: 'Energy' },
    courage: { icon: '🛡️', name: 'Courage' },
    wisdom: { icon: '💡', name: 'Wisdom' },
    friend_hina: { icon: '☀️', name: 'Hinata Bond' },
    friend_ayano: { icon: '🌙', name: 'Ayano Bond' },
};

let story = null;
let state = null;
let currentEvent = null;
const storySelect = document.getElementById('storySelect');
let clickTimer = null;
let currentStoryIdentifier = '';
let currentStoryPath = '';   

function freshState(){
  return {
    idx: 0,
    stats: { happy:0, food:0, energy:0 },
    seen: new Set(),
    log: [],
    availableTurns: 3,
    lastCheckTime: Date.now(),
    activePlayers: [],
    playerPool: [],
  };
}

function save(identifier){
  const s = {...state, seen:[...state.seen]};
  localStorage.setItem(SAVE_PREFIX + identifier, JSON.stringify(s));
}

function load(identifier){
  try{
    const raw = localStorage.getItem(SAVE_PREFIX + identifier);
    if(!raw) return null;
    const o = JSON.parse(raw);
    o.seen = new Set(o.seen || []);
    o.stats = o.stats || { happy:0, food:0, energy:0 };
    o.activePlayers = o.activePlayers || [];
    o.playerPool = o.playerPool || [];
    return o;
  }catch(e){ return null; }
}

async function loadStoryFile(filePath){
  try{
    const res = await fetch(filePath, {cache:'no-store'});
    if(!res.ok) throw new Error(`File not found: ${filePath}`);
    return await res.json();
  }catch(e){
    console.error(e);
    throw e;
  }
}

async function startGame(storyIdentifier){
  if (!storyIdentifier) return;
  
  try {
    currentStoryIdentifier = storyIdentifier;
    currentStoryPath = `stories/${storyIdentifier}`;

    story = await loadStoryFile(`${currentStoryPath}/story.json`);
    const saved = load(storyIdentifier);
    state = saved || freshState();
    
    if (!saved || (state.activePlayers.length === 0 && state.playerPool.length === 0)) {
      state.playerPool = story.players || [];
      state.activePlayers = [];
    }
    
    document.getElementById('dayTotal').textContent = story.events.length;
    if (COUNTDOWN_MODE === 'ON') {
        updateAvailableTurns();
    }
    render();
  } catch (e) {
    showToBeContinued(storyIdentifier);
  }
}

function showToBeContinued(storyIdentifier) {
    story = null;
    state = null;
    
    document.getElementById('img').innerHTML = '⏳';
    document.getElementById('title').textContent = "The adventure is about to begin";
    document.getElementById('text').textContent = `The story of「${storyIdentifier}」is still being written. Please look forward to the next chapter!！\n(The story of "${storyIdentifier}" is yet to come. To be continued...)`;
    document.getElementById('hint').textContent = "You can select other unlocked stories from the menu above.";
    document.getElementById('choices').innerHTML = '';
    document.getElementById('friendsPanel').innerHTML = '';
    document.getElementById('statsList').innerHTML = '';
    document.getElementById('log').innerHTML = '';
}

function render(){
  if (!story || state.idx >= story.events.length){
    if (story) showEnding();
    return;
  }
  const ev = story.events[state.idx];
  currentEvent = ev;
  
  const fullImgSrc = ev.img ? `${currentStoryPath}/${ev.img}` : null;
  document.getElementById('img').innerHTML = fullImgSrc ? `<img src="${fullImgSrc}" alt="${ev.title}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">` : '🖼️';
  
  document.getElementById('title').textContent = ev.title || `Day ${state.idx+1}`;
  document.getElementById('text').textContent = ev.text || '';
  document.getElementById('hint').textContent = "Click on a friend's portrait for a hint...";

  const ch = document.getElementById('choices'); ch.innerHTML = '';
  (ev.options||[]).forEach(opt=>{
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = opt.text;
    
    if (opt.requires && !safeEvalCondition(opt.requires, state.stats)) {
      btn.disabled = true;
      btn.title = `Requires: ${opt.requires}`;
    }
    
    btn.onclick = ()=> handleChoice(opt, btn);
    if(COUNTDOWN_MODE === 'ON' && state.availableTurns <= 0) btn.disabled = true;
    ch.appendChild(btn);
  });
  
  renderPlayers();
  updateUI();
}

function showEnding(){
  const ed = evalEnding();
  if (!ed) {
      alert("Could not determine an ending.");
      return;
  }
  
  const continueBtn = document.getElementById('continueToNext');
  if (ed.unlocks) {
    unlockStory(ed.unlocks);
    continueBtn.style.display = '';
    continueBtn.onclick = () => {
        document.getElementById('endingMask').style.display = 'none';
        storySelect.value = ed.unlocks;
        startGame(ed.unlocks);
    };
  } else {
    continueBtn.style.display = 'none';
  }

  const modal = document.querySelector('#endingMask .modal');
  modal.querySelector('.ending-image')?.remove();
  
  if (ed.img) {
    const fullEndingImgSrc = `${currentStoryPath}/${ed.img}`;
    const titleEl = document.getElementById('endTitle');
    const imgHtml = `<img src="${fullEndingImgSrc}" alt="${ed.title}" class="ending-image" style="width: 100%; max-width: 350px; margin: 0 auto 12px; display: block; border-radius: 10px; border: 2px solid var(--line);">`;
    titleEl.insertAdjacentHTML('beforebegin', imgHtml);
  }

  document.getElementById('endTitle').textContent = ed.title || 'Ending';
  document.getElementById('endText').textContent = ed.text || '';
  
  const statsRow = modal.querySelector('.statsRow');
  statsRow.innerHTML = '';
  Object.keys(state.stats).forEach(key => {
      const config = STAT_CONFIG[key];
      if (config && state.stats[key] !== 0) {
          const span = document.createElement('span');
          span.className = 'pill';
          span.innerHTML = `${config.icon} <span>${state.stats[key]}</span>`;
          statsRow.appendChild(span);
      }
  });

  document.getElementById('endingMask').style.display = 'flex';
}

function handleChoice(opt, anchor){
  if(COUNTDOWN_MODE === 'ON' && state.availableTurns <= 0){
    alert("You're too tired for today. You need to wait a while to continue interacting with the kitten!");
    return;
  }
  if (COUNTDOWN_MODE === 'ON') state.availableTurns--;

  applyEffectString(opt.effect || '', anchor);
  state.log.push({ index: state.idx, title: currentEvent.title, pick: opt.text, effect: opt.effect || '' });
  state.seen.add(currentEvent.id);
  state.idx++;
  save(currentStoryIdentifier);
  render();
}

function createPlayerCard(player, isRemovable) {
    const card = document.createElement('div');
    card.className = 'friendCard';
    card.onclick = () => handlePlayerClick(player, card);
    const fullAvatarSrc = `${currentStoryPath}/${player.avatar}`;
    const resourceConfig = STAT_CONFIG[player.resource] || { icon: '🎁' };
    card.innerHTML = `<div class="friendAvatar"><img src="${fullAvatarSrc}" alt="${player.name}"></div><div class="friendName">${player.name}</div><div class="friendStat">${resourceConfig.icon}</div>`;
    if (isRemovable) {
        const removeBtn = document.createElement('div');
        removeBtn.className = 'btnDelete';
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = (e) => { e.stopPropagation(); removeFromActive(player.id); };
        card.appendChild(removeBtn);
    }
    return card;
}
function renderPlayers() {
  const panel = document.getElementById('friendsPanel');
  panel.innerHTML = '';
  if (!state) return;
  state.activePlayers.forEach(player => { panel.appendChild(createPlayerCard(player, true)); });
  const emptySlots = MAX_ACTIVE_PLAYERS - state.activePlayers.length;
  for (let i = 0; i < emptySlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'emptySlot'; slot.textContent = '+'; slot.title = 'Add a friend';
    slot.onclick = openFriendSelectModal;
    panel.appendChild(slot);
  }
}
function openFriendSelectModal() { document.getElementById('friendSelectMask').style.display = 'flex'; renderFriendPool(); }
function closeFriendSelectModal() { document.getElementById('friendSelectMask').style.display = 'none'; }
function renderFriendPool() {
  const container = document.getElementById('friendPoolContainer');
  container.innerHTML = '';
  state.playerPool.forEach(player => {
    const card = createPlayerCard(player, false);
    card.onclick = () => addToActive(player.id);
    container.appendChild(card);
  });
}
function addToActive(playerId) {
  if (state.activePlayers.length >= MAX_ACTIVE_PLAYERS) return alert("Your party is full!");
  const playerIndex = state.playerPool.findIndex(p => p.id === playerId);
  if (playerIndex > -1) {
    const [player] = state.playerPool.splice(playerIndex, 1);
    state.activePlayers.push(player);
    save(currentStoryIdentifier);
    renderPlayers();
    closeFriendSelectModal();
  }
}
function removeFromActive(playerId) {
  const playerIndex = state.activePlayers.findIndex(p => p.id === playerId);
  if (playerIndex > -1) {
    const [player] = state.activePlayers.splice(playerIndex, 1);
    state.playerPool.push(player);
    state.playerPool.sort((a, b) => a.name.localeCompare(b.name));
    save(currentStoryIdentifier);
    renderPlayers();
  }
}
function handlePlayerClick(player, cardElement) {
    if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; handlePlayerDoubleClick(player, cardElement); } 
    else { clickTimer = setTimeout(() => { clickTimer = null; handlePlayerSingleClick(player); }, 250); }
}
function handlePlayerSingleClick(player) {
    const hintEl = document.getElementById('hint');
    const hintData = currentEvent.hint;
    if (hintData && typeof hintData === 'object' && hintData.speaker === player.name) { hintEl.textContent = `${player.name}: ${hintData.text}`; } 
    else if (typeof hintData === 'string' && hintData) { hintEl.textContent = hintData; } 
    else { hintEl.textContent = `${player.name} thinks it's best to stay quiet for now...`; }
}
function handlePlayerDoubleClick(player, cardElement) {
    if (!state.stats.energy || state.stats.energy < 1) return alert('Not enough energy to get help from friends!');
    state.stats.energy--;
    const resource = player.resource;
    if (resource && STAT_CONFIG[resource]) {
        state.stats[resource] = (state.stats[resource] || 0) + 1;
        floatText(`+1 ${STAT_CONFIG[resource].icon} / -1 ⚡`, cardElement);
    }
    save(currentStoryIdentifier);
    updateUI();
}
function applyEffectString(str, anchorEl){
  if(!str) return;
  str.split(',').map(s=>s.trim()).filter(Boolean).forEach(p => {
    const m = p.match(/^(\w+)\s*([+-]\d+)$/i);
    if(!m) return;
    const key = m[1].toLowerCase(), val = parseInt(m[2], 10);
    state.stats[key] = (state.stats[key] || 0) + val;
    floatText(`${val>0?'+':''}${val} ${STAT_CONFIG[key] ? STAT_CONFIG[key].icon : '⭐'}`, anchorEl);
  });
  updateUI();
}
function floatText(text, anchorEl){
  const rect = anchorEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.textContent = text; el.className = 'unlock'; el.style.display = 'block';
  el.style.position = 'fixed'; el.style.left = `${rect.left + rect.width / 2}px`;
  el.style.top  = `${rect.top - 10}px`; el.style.transform = 'translateX(-50%)';
  el.style.background = 'transparent'; el.style.border = 'none'; el.style.fontSize = '14px';
  el.style.fontWeight = '900'; el.style.color = '#b22222';
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 900);
}
function parseEffectForDisplay(effectString) {
    if (!effectString) return '';
    return effectString.split(',').map(s => s.trim()).filter(Boolean).map(p => {
        const m = p.match(/^(\w+)\s*([+-]\d+)$/i); if (!m) return '';
        return `<span class="log-effect-tag">${STAT_CONFIG[m[1].toLowerCase()] ? STAT_CONFIG[m[1].toLowerCase()].icon : '⭐'} ${m[2]}</span>`;
    }).join(' ');
}
function updateUI(){
  if (!story || !state) return;
  document.getElementById('dayNow').textContent = Math.min(state.idx+1, story.events.length);
  const turnsPill = document.getElementById('turnsPill');
  if (COUNTDOWN_MODE === 'ON') { turnsPill.style.display = ''; document.getElementById('turnsCount').textContent = state.availableTurns || 0; } 
  else { turnsPill.style.display = 'none'; }
  const statsList = document.getElementById('statsList');
  statsList.innerHTML = '';
  Object.keys(state.stats).forEach(key => {
      if (STAT_CONFIG[key]) {
          const div = document.createElement('div');
          div.className = 'stat';
          div.innerHTML = `${STAT_CONFIG[key].name} ${STAT_CONFIG[key].icon}: <strong>${state.stats[key] || 0}</strong>`;
          statsList.appendChild(div);
      }
  });
  const pct = Math.round((state.seen.size / story.events.length) * 100);
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressText').textContent = `${state.seen.size} / ${story.events.length} (${pct}%)`;
  const logEl = document.getElementById('log'); logEl.innerHTML = '';
  state.log.forEach(row=>{
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = `<strong>${row.title || `Day ${row.index+1}`}:</strong> ${row.pick} ${parseEffectForDisplay(row.effect)}`;
    logEl.appendChild(div);
  });
  document.getElementById('seenPct').textContent = `${pct}%`;
}
function evalEnding(){
  for (const ending of story.endings) {
    if (safeEvalCondition(ending.condition || 'true', state.stats)) {
      const candidates = story.endings.filter(e => (e.condition || 'true') === (ending.condition || 'true'));
      return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
    }
  }
  return story.endings[story.endings.length - 1];
}
function safeEvalCondition(cond, stats){
  const statKeys = Object.keys(STAT_CONFIG);
  const statValues = statKeys.map(key => stats[key] || 0);
  try{
    return !!(new Function(...statKeys, `return (${cond});`)(...statValues));
  }catch(e){ console.error("Error evaluating condition:", cond, e); return false; }
}
function updateAvailableTurns() {
  if (COUNTDOWN_MODE === 'OFF' || !state) return;
  const now = Date.now(); if (!state.lastCheckTime) state.lastCheckTime = now;
  const intervalsPassed = Math.floor((now - state.lastCheckTime) / TURN_INTERVAL_MS);
  if (intervalsPassed > 0) {
    state.availableTurns = Math.min(MAX_AVAILABLE_TURNS, (state.availableTurns || 0) + (intervalsPassed * TURNS_PER_INTERVAL));
    state.lastCheckTime += intervalsPassed * TURN_INTERVAL_MS;
    save(currentStoryIdentifier); updateUI(); render();
  }
}
function getUnlockedStories() {
  try {
    const unlocked = JSON.parse(localStorage.getItem(UNLOCK_KEY));
    return (Array.isArray(unlocked) && unlocked.includes(storySelect.options[0].value)) ? unlocked : [storySelect.options[0].value];
  } catch (e) { return [storySelect.options[0].value]; }
}
function unlockStory(storyIdentifier) {
  const unlocked = getUnlockedStories();
  if (!unlocked.includes(storyIdentifier)) {
    unlocked.push(storyIdentifier);
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
    updateStorySelectUI();
  }
}
function updateStorySelectUI() {
  const unlocked = getUnlockedStories();
  storySelect.querySelectorAll('option').forEach(option => {
    option.disabled = !unlocked.includes(option.value);
  });
}
function formatTime(ms) {
    if (ms <= 0) return "(00:00)";
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    return `(${minutes}:${seconds})`;
}
function updateCountdown() {
    if (COUNTDOWN_MODE === 'OFF' || !state) return;
    const timerEl = document.getElementById('countdownTimer');
    if (!state.availableTurns || state.availableTurns > 0) { timerEl.textContent = ''; return; }
    const timeRemaining = (state.lastCheckTime || Date.now()) + TURN_INTERVAL_MS - Date.now();
    timerEl.textContent = timeRemaining > 0 ? formatTime(timeRemaining) : '(00:00)';
    if (timeRemaining <= 0) updateAvailableTurns();
}

document.getElementById('btnLoad').addEventListener('click', () => {
    currentStoryIdentifier = storySelect.value;
    startGame(currentStoryIdentifier);
});
document.getElementById('btnReset').addEventListener('click', ()=>{
  const storyId = storySelect.value;
  if(!confirm(`Are you sure you want to clear the save data for this story (${storyId})?`)) return;
  localStorage.removeItem(SAVE_PREFIX + storyId);
  startGame(storyId);
});
document.getElementById('btnReplay').addEventListener('click', ()=>{
  if(!currentStoryIdentifier) { alert("Please load a story first."); return; }
  if(!confirm('Are you sure you want to start over? This will reset your progress for the current story.')) return;
  state = freshState();
  startGame(currentStoryIdentifier);
});
document.getElementById('btnDownload').addEventListener('click', ()=>{
  if(!currentStoryIdentifier) { alert("Please load a story first."); return; }
  const blob = new Blob([JSON.stringify({stats:state.stats, log:state.log, seen:[...state.seen]},null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `${currentStoryIdentifier.replace('/', '_')}_diary.json`;
  a.click(); URL.revokeObjectURL(a.href);
});
document.getElementById('closeEnd').addEventListener('click', ()=> document.getElementById('endingMask').style.display='none');
document.getElementById('replayFromEnd').addEventListener('click', ()=>{
  document.getElementById('endingMask').style.display='none';
  state = freshState();
  startGame(currentStoryIdentifier);
});
document.getElementById('closeFriendSelect').addEventListener('click', closeFriendSelectModal);

updateStorySelectUI();
if (COUNTDOWN_MODE === 'ON') {
    setInterval(updateAvailableTurns, 5000); 
    setInterval(updateCountdown, 1000);
}

startGame(storySelect.value).catch(console.error);
