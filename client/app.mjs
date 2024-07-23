const form = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        resultDiv.textContent = data.choices[0].message.content;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
