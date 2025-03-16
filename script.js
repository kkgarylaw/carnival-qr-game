const progressDisplay = document.getElementById('progress');
    const voucherDisplay = document.getElementById('voucher');

    function getBoothNumber() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('booth');
    }

    function updateProgress() {
        let scannedBooths = JSON.parse(localStorage.getItem('scannedBooths')) || [];
        let completionOrder = JSON.parse(localStorage.getItem('completionOrder')) || [];
        const boothNumber = getBoothNumber();

        if (boothNumber && !scannedBooths.includes(boothNumber)) {
            scannedBooths.push(boothNumber);
            completionOrder.push(boothNumber);
            localStorage.setItem('scannedBooths', JSON.stringify(scannedBooths));
            localStorage.setItem('completionOrder', JSON.stringify(completionOrder));
        }

        progressDisplay.textContent = `You've scanned ${scannedBooths.length}/6 booths!`;

        if (scannedBooths.length === 6) {
            voucherDisplay.style.display = 'block';
            progressDisplay.style.display = 'none';
            sendCompletionData(scannedBooths, completionOrder);
        }
    }

    function sendCompletionData(scannedBooths, completionOrder) {
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbydq1DPGMlK7_FFcmIfiRy-nNn8iw90qklXvaMD82_nwr8rqtiGrBCYv-ZGTRynvISl/exec'; // Replace with your Web App URL
        const booths = {};

        for (let i = 1; i <= 6; i++) {
            booths[i] = scannedBooths.includes(i.toString());
        }

        fetch(webAppUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                booths: booths,
                completionOrder: completionOrder.join(',')
            })
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
