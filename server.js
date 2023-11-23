const express = require('express');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const csvFilePath = 'C:\\Users\\bijay\\OneDrive\\Desktop\\Malicious Url Filter site Prototype\\dataset\\sus_urls.csv';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/check', (req, res) => {
    const urlToCheck = req.query.url;
    let isSus = false;

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.url === urlToCheck) {
                isSus = true;
                res.json({ message: 'The URL you just pasted is sus ඞ', sus: true });
                return;
            }
        })
        .on('end', () => {
            if (!isSus) {
                res.json({ message: 'URL not found in the sus list. Redirecting...', sus: false });
            }
        });
});

app.get('/', (req, res) => {
    // Serve the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
