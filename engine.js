// engine.js - W.E.N.D.A.R.I.A Processing Engine Logic
function getPick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function formatPHTime() {
    const now = new Date();
    const phTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8));
    return phTime.toTimeString().split(' ')[0];
}

// --- Live Clock Background Loop ---
setInterval(() => {
    document.getElementById('live-clock').innerText = formatPHTime();
}, 1000);
document.getElementById('live-clock').innerText = formatPHTime();

// --- Routing Engine Dictionary ---
const COMMAND_REGISTRY = {
    "hello": () => getPick(DIALOGUES.greetings),
    "hi": () => getPick(DIALOGUES.greetings),
    "time": () => getPick(DIALOGUES.time).replace("{val}", formatPHTime()),
    "date": () => {
        const now = new Date();
        const phTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8));
        return getPick(DIALOGUES.date).replace("{val}", phTime.toISOString().split('T')[0]);
    }
};

// --- Terminal Input Action Listener ---
document.getElementById('consoleInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const directive = this.value.trim();
        if (!directive) return;

        const log = document.getElementById('terminalLog');
        log.innerHTML += `<div class="log-entry"><div class="user-line">> ${directive}</div></div>`;
        this.value = '';

        const cleanCmd = directive.toLowerCase().strip ? directive.toLowerCase().strip() : directive.toLowerCase();

        if (cleanCmd === 'clear' || cleanCmd === 'cls') {
            log.innerHTML = '<div class="log-entry"><div class="wendaria-line">W.E.N.D.A.R.I.A: Display log layer cleared.</div></div>';
            return;
        }

        let response = COMMAND_REGISTRY[cleanCmd] ? COMMAND_REGISTRY[cleanCmd]() : getPick(DIALOGUES.errors).replace("{val}", directive);
        
        log.innerHTML += `<div class="log-entry"><div class="wendaria-line">${response}</div></div>`;
        log.scrollTop = log.scrollHeight;
    }
});