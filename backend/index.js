import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

const attendees = new Set();

/**
 * Удаляем лишние пробелы в имени, приводим к нижнему регистру
 */
function validateName(name) {
    if (!name) return null;
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

app.get('/attendee', (req, res) => {
    res.send({ amount: attendees.size });
});

app.post('/attendee', (req, res) => {
    const name = validateName(req.body.name);
    if (name) attendees.add(name);
    res.send({ amount: attendees.size });
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
