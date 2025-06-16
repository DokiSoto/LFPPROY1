import express from 'express';
import analyzeRouter from './routes/analyze.route';

const app = express(); 
const PORT = 4000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.text());
app.use(analyzeRouter);

app.listen(PORT, () => {
    console.log(`el servidor es http://localhost:${PORT}`);
});