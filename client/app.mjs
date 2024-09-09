const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const queryInput = document.getElementById('queryInput');
const queryButton = document.getElementById('queryButton');
const resultDiv = document.getElementById('result');
const statsDiv = document.getElementById('stats');

uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

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

queryButton.addEventListener('click', async () => {
    const query = queryInput.value.trim();
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
        resultDiv.textContent = data.response;
        statsDiv.textContent = `Eval count: ${data.eval_count}, Eval duration: ${data.eval_duration}ms`;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your query');
    }
});