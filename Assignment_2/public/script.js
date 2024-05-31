const createFile = () => {
    const filename = document.getElementById('create-filename').value;
    const content = document.getElementById('create-content').value;
  
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, content }),
    })
      .then(response => response.json())
      .then(data => alert(data.message || data.error));
  };
  
  const readFile = () => {
    const filename = document.getElementById('read-filename').value;
  
    fetch(`/read/${filename}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          document.getElementById('file-content').textContent = data.content;
        }
      });
  };
  
  const deleteFile = () => {
    const filename = document.getElementById('delete-filename').value;
  
    fetch(`/delete/${filename}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => alert(data.message || data.error));
  };
  