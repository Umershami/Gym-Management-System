const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'trainers.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// Load trainers data
app.get('/api/trainers', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
            return;
        }
        res.send(JSON.parse(data));
    });
});

// Save trainers data
app.post('/api/trainers', (req, res) => {
    const newTrainer = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
            return;
        }

        const trainers = JSON.parse(data);
        trainers.push(newTrainer);

        fs.writeFile(DATA_FILE, JSON.stringify(trainers, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving data file');
                return;
            }
            res.sendStatus(200);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
