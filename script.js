const progressDisplay = document.getElementById('progress');
const voucherDisplay = document.getElementById('voucher');

function getBoothNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('booth');
}

function updateProgress() {
    let scannedBooths = JSON.parse(localStorage.getItem('scannedBooths')) || [];
    const boothNumber = getBoothNumber();

    if (boothNumber && !scannedBooths.includes(boothNumber)) {
        scannedBooths.push(boothNumber);
        localStorage.setItem('scannedBooths', JSON.stringify(scannedBooths));
    }

    progressDisplay.textContent = `You've scanned ${scannedBooths.length}/6 booths!`;

    if (scannedBooths.length === 6) {
        voucherDisplay.style.display = 'block';
        progressDisplay.style.display = 'none';
        sendCompletionData();
    }
}

function sendCompletionData() {
    const webAppUrl = 'YOUR_WEB_APP_URL'; // Replace with your Web App URL
    const completed = true;

    fetch(webAppUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: completed }) // Only send the completed flag
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data sent:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

updateProgress();
