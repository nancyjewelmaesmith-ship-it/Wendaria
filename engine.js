// engine.js - W.E.N.D.A.R.I.A Processing Engine Logic
const pageLoadTime = Date.now();

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
    const clockEl = document.getElementById('live-clock');
    if (clockEl) clockEl.innerText = formatPHTime();
}, 1000);

// --- Complete Routing Engine Dictionary ---
const COMMAND_REGISTRY = {
    "hello": () => getPick(DIALOGUES.greetings),
    "hi": () => getPick(DIALOGUES.greetings),
    "protocols": () => DIALOGUES.protocols,
    "time": () => getPick(DIALOGUES.time).replace("{val}", formatPHTime()),
    "date": () => {
        const now = new Date();
        const phTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8));
        return getPick(DIALOGUES.date).replace("{val}", phTime.toISOString().split('T')[0]);
    },
    "platform status": () => {
        return "W.E.N.D.A.R.I.A: Executing Client-Node Platform Sweep...\n\n- **Client Execution Layer:** Live HTML5 Engine\n- **Session Architecture:** Non-Volatile Memory Array\n- **Data Pipeline Layer:** Pure Static Micro-Router\nWeb application framework is structurally fully optimized.";
    },
    "system telemetry": () => {
        const mem = window.performance && window.performance.memory ? (window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) + " MB" : "OPTIMAL";
        return `W.E.N.D.A.R.I.A: Fetching live browser edge-node metrics...\n\n- **Application PID:** \`BROWSER_THREAD\`\n- **Container Script Engine:** \`JavaScript V8 / SpiderMonkey\`\n- **Active Client Memory Allocated:** \`${mem}\`\n- **Platform Core State:** \`HEALTHY // OPERATIONAL\``;
    },
    "network audit": () => {
        return "W.E.N.D.A.R.I.A: Auditing current network socket layers...\n\n- **Active Listening Sockets:** `0 (CLIENT_ISOLATED)`\n- **Established Web Handshakes:** `1 (LOCAL_CANVAS)`\n- **Data Pipeline Encryption:** `SECURE CLIENT SANITATION`\nUpstream network socket pathways are entirely clear and verified.";
    },
    "session diagnostics": () => {
        return "W.E.N.D.A.R.I.A: Active client browser state registers nominal. Local storage transaction array is clearing frames instantly.";
    },
    "system uptime": () => {
        const diff = Math.floor((Date.now() - pageLoadTime) / 1000);
        const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const secs = String(diff % 60).padStart(2, '0');
        return "W.E.N.D.A.R.I.A: Infrastructure availability metric evaluated. Host node runtime index: " + hrs + "h " + mins + "m " + secs + "s.";
    },
    "ping loop": () => {
        const latency = (Math.random() * 0.15 + 0.01).toFixed(3);
        return "W.E.N.D.A.R.I.A: Network route latency benchmarked. Direct pipe speed calculated at " + latency + "ms.";
    }
};

// --- Terminal Input Action Listener ---
document.addEventListener("DOMContentLoaded", () => {
    const consoleInput = document.getElementById('consoleInput');
    const terminalLog = document.getElementById('terminalLog');

    if (!consoleInput || !terminalLog) return;

    // AUTOMATIC INITIALIZATION: Instantly loads the function manual on website start
    const introLogEntry = document.createElement('div');
    introLogEntry.className = 'log-entry';
    introLogEntry.innerHTML = `<div class="wendaria-line" style="margin-top: 15px;">${COMMAND_REGISTRY["protocols"]()}</div>`;
    terminalLog.appendChild(introLogEntry);

    consoleInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const directive = this.value.trim();
            if (!directive) return;

            // 1. Render the user terminal input line with the brand new "you>" label
            const userLogEntry = document.createElement('div');
            userLogEntry.className = 'log-entry';
            userLogEntry.innerHTML = `<div class="user-line">you> ${directive}</div>`;
            terminalLog.appendChild(userLogEntry);
            
            this.value = ''; // Instantly clear input field

            const cleanCmd = directive.toLowerCase().trim();

            // 2. Direct screen wipe utility
            if (cleanCmd === 'clear' || cleanCmd === 'cls') {
                terminalLog.innerHTML = '<div class="log-entry"><div class="wendaria-line">W.E.N.D.A.R.I.A: Display log layer cleared.</div></div>';
                return;
            }

            // 3. Execute command calculation or fallback to randomized error array
            let response = "";
            if (COMMAND_REGISTRY[cleanCmd]) {
                response = COMMAND_REGISTRY[cleanCmd]();
            } else {
                let matched = false;
                for (const key in COMMAND_REGISTRY) {
                    if (cleanCmd.includes(key)) {
                        response = COMMAND_REGISTRY[key]();
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    response = getPick(DIALOGUES.errors).replace("{val}", directive);
                }
            }
            
            // 4. Render system response block
            const sysLogEntry = document.createElement('div');
            sysLogEntry.className = 'log-entry';
            sysLogEntry.innerHTML = `<div class="wendaria-line">${response}</div>`;
            terminalLog.appendChild(sysLogEntry);
            
            terminalLog.scrollTop = terminalLog.scrollHeight;
        }
    });
});
