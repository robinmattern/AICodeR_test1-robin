const uploadButton = document.getElementById('uploadButton');
const queryButton = document.getElementById('queryButton');
const resultDiv = document.getElementById('result');

uploadButton.addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a PDF file');
        return;
    }

    const formData = new FormData();
    formData.append('pdfFile', file);

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
    const queryInput = document.getElementById('queryInput');
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
        resultDiv.innerHTML = `
            <h3>Answer:</h3>
            <p>${data.answer}</p>
            <h3>Query Statistics:</h3>
            <p>Execution Time: ${data.executionTime} ms</p>
            <p>Tokens Generated: ${data.tokensGenerated}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your query');
    }
});