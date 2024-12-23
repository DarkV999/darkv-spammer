const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST method is allowed' });
    }

    const { botToken, serverId } = req.body;

    if (!botToken || !serverId) {
        return res.status(400).json({ error: 'Bot token or server ID missing' });
    }

    try {
        // Fetch server info
        const serverResponse = await axios.get(`https://discord.com/api/v10/guilds/${serverId}`, {
            headers: { Authorization: `Bot ${botToken}` },
        });
        const serverData = serverResponse.data;

        // Fetch bot info (user data)
        const botResponse = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: { Authorization: `Bot ${botToken}` },
        });
        const botData = botResponse.data;

        return res.json({
            botName: botData.username,
            botId: botData.id,
            serverName: serverData.name,
            serverId: serverData.id,
        });
    } catch (error) {
        console.error('Error fetching data from Discord API:', error.message);

        if (error.response) {
            // Discord API errors
            return res.status(error.response.status).json({
                error: error.response.data.message || 'Discord API error',
            });
        }

        // Other errors
        return res.status(500).json({ error: 'Failed to fetch data from Discord API' });
    }
};
