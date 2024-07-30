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
        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the file');
    }
});

queryBtn.addEventListener('click', async () => {
    const query = document.getElementById('query').value;
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
        const result = await response.json();
        resultDiv.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the query');
    }
});