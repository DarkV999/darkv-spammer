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
        const headers = {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
        };

        // Deleting channels, roles, members, etc. (your existing logic for nuking)
        // (The logic will be the same as you outlined earlier)

        return res.json({ message: 'Server nuked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to perform nuking actions' });
    }
};
