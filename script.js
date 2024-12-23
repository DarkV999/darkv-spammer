// Handle Tab Navigation
window.addEventListener('load', () => {
    document.getElementById("homeTab").addEventListener("click", () => toggleTab("home"));
    document.getElementById("spammerTab").addEventListener("click", () => toggleTab("spammer"));
    document.getElementById("infoTab").addEventListener("click", () => toggleTab("info"));
    document.getElementById("buyTab").addEventListener("click", () => toggleTab("buy"));
    document.getElementById("nukerTab").addEventListener("click", () => toggleTab("nuker"));
});

function toggleTab(tabId) {
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = "none";
    });
    document.getElementById(`${tabId}Content`).style.display = 'block';
}

// Nuker Tab JavaScript
const nukeButton = document.getElementById('nukeButton');
const nukerStatus = document.getElementById('nukerStatus');
const nukerLoader = document.getElementById('nukerLoader');
const botTokenInput = document.getElementById('botToken');
const serverIdInput = document.getElementById('serverId');
const botNameElement = document.getElementById('botName');
const serverNameElement = document.getElementById('serverName');

nukeButton.addEventListener("click", async () => {
    const botToken = botTokenInput.value.trim();
    const serverId = serverIdInput.value.trim();

    if (!botToken || !serverId) {
        nukerStatus.textContent = "Status: Error... Invalid Bot Token or Server ID";
        return;
    }

    nukerStatus.textContent = "Status: Fetching Bot Info...";
    nukerLoader.style.display = "block";

    try {
        // Fetch bot user info and server info from backend
        const response = await fetch('/api/fetchBotInfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ botToken, serverId })
        });

        const botInfo = await response.json();
        botNameElement.textContent = `Bot Name: ${botInfo.botName}`;
        serverNameElement.textContent = `Server Name: ${botInfo.serverName}`;

        // Start nuking process
        await fetch('/api/nukeServer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ botToken, serverId })
        });

        nukerStatus.textContent = "Status: Nuking completed successfully!";
    } catch (error) {
        console.error(error);
        nukerStatus.textContent = "Status: Error occurred during nuking!";
    } finally {
        nukerLoader.style.display = "none";
    }
});
