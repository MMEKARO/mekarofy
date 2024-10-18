async function downloadMusic() {
    const url = document.getElementById('url').value;
    if (!url) {
        alert('Insira um link válido!');
        return;
    }

    document.getElementById('status').innerText = 'Baixando...';
    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        document.getElementById('status').innerText = 'Download concluído!';

        const library = document.getElementById('library');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="/download/${data.filename}" download>${data.filename}</a>`;
        library.appendChild(listItem);
    } catch (error) {
        document.getElementById('status').innerText = 'Erro ao baixar.';
        console.error('Erro:', error);
    }
}
