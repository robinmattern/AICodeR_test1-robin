const uploadBtn = document.getElementById('uploadBtn');
const queryBtn = document.getElementById('queryBtn');
const fileInput = document.getElementById('icsFile');
const promptInput = document.getElementById('prompt');
const resultDiv = document.getElementById('result');

let fileContent = '';

uploadBtn.addEventListener('click', async () => {
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
      body: formData,
    });

    const data = await response.json();
    fileContent = data.content;
    alert('File uploaded successfully');
  } catch (error) {
    console.error('Error:', error);
    alert('Error uploading file');
  }
});

queryBtn.addEventListener('click', async () => {
  const prompt = promptInput.value;
  if (!prompt) {
    alert('Please enter a query');
    return;
  }

  try {
    const response = await fetch('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: `${fileContent}\n\n${prompt}` }),
    });

    const data = await response.json();
    resultDiv.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error:', error);
    alert('Error querying OpenAI');
  }
});
