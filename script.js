// Handle Tab Navigation
window.addEventListener('load', () => {
    const tabs = ["home", "spammer", "info", "buy", "nuker"];
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`${tab}Tab`);
        if (tabElement) {
            tabElement.addEventListener("click", () => toggleTab(tab));
        }
    });
});

function toggleTab(tabId) {
    // Hide all containers
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = "none";
    });

    // Show the selected tab's content
    const content = document.getElementById(`${tabId}Content`);
    if (content) {
        content.style.display = 'block';
    } else {
        console.error(`Content for tab '${tabId}' not found.`);
    }
}

// Nuker Tab JavaScript
window.addEventListener('load', () => {
    const nukeButton = document.getElementById('nukeButton');
    const nukerStatus = document.getElementById('nukerStatus');
    const nukerLoader = document.getElementById('nukerLoader');
    const botTokenInput = document.getElementById('botToken');
    const serverIdInput = document.getElementById('serverId');
    const botNameElement = document.getElementById('botName');
    const serverNameElement = document.getElementById('serverName');

    if (!nukeButton || !nukerStatus || !nukerLoader || !botTokenInput || !serverIdInput || !botNameElement || !serverNameElement) {
        console.error("Nuker elements not properly loaded in the DOM.");
        return;
    }

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

            if (!response.ok) {
                throw new Error(`Error fetching bot info: ${response.statusText}`);
            }

            const botInfo = await response.json();
            botNameElement.textContent = `Bot Name: ${botInfo.botName}`;
            serverNameElement.textContent = `Server Name: ${botInfo.serverName}`;

            // Start nuking process
            const nukeResponse = await fetch('/api/nukeServer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ botToken, serverId })
            });

            if (!nukeResponse.ok) {
                throw new Error(`Error during nuking: ${nukeResponse.statusText}`);
            }

            nukerStatus.textContent = "Status: Nuking completed successfully!";
        } catch (error) {
            console.error(error);
            nukerStatus.textContent = "Status: Error occurred during nuking!";
        } finally {
            nukerLoader.style.display = "none";
        }
    });
});
