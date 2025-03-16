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
        sendCompletionData(); // Call the function to send data
    }
}

function sendCompletionData() {
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbydq1DPGMlK7_FFcmIfiRy-nNn8iw90qklXvaMD82_nwr8rqtiGrBCYv-ZGTRynvISl/exec'; // Replace with your Web App URL
    const userId = 'user_' + Math.random().toString(36).substring(2, 15); // Generate a unique user ID, or use a more robust method.
    const completed = true;

    fetch(webAppUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, completed: completed })
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
