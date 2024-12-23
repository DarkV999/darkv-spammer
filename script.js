const spamButton = document.getElementById('spamButton');
const statusText = document.getElementById('status');
const webhookUrlInput = document.getElementById('webhookUrl');
const loader = document.getElementById('loader');

const customWebhookData = {
    username: "COOKED BY DARKV",  // Custom webhook name
    avatar_url: "https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png?ex=676a1afc&is=6768c97c&hm=8586677d875c772f95983ff3426ae0f732a0a402fc037263566aaef14633eb33&",  // Custom profile picture URL
    content: "😈🤦‍♂️WEBHOOK COOKED BY DARKV @everyone OUR SERVER: https://discord.gg/dpRvmbRZUK 🤦‍♂️😈 & OUR WEBSITE: https://darkv-spammer-blond.vercel.app/"  // Custom message
};

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
