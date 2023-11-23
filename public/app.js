function search() {
    const urlInput = document.getElementById('urlInput').value;
    if (urlInput) {
        fetch(`/check?url=${encodeURIComponent(urlInput)}`)
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (!data.sus) {
                    window.location.href = urlInput;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Please enter a URL.');
    }
}
