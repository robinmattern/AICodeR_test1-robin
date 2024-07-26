const uploadBtn = document.getElementById('uploadBtn');
const queryBtn = document.getElementById('queryBtn');
const resultDiv = document.getElementById('result');

uploadBtn.addEventListener('click', async () => {
    const fileInput = document.getElementById('icsFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('icsFile', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Error uploading file');
    }
});

queryBtn.addEventListener('click', async () => {
    const queryInput = document.getElementById('queryInput');
    const query = queryInput.value;
    if (!query) {
        alert('Please enter a query');
        return;
    }

    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        resultDiv.textContent = data.answer;
    } catch (error) {
        alert('Error processing query');
    }
});