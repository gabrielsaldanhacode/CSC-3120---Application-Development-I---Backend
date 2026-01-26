const express = require('express');
const app = express();
const PORT = 3000;

app.get('/status', (req, res) => {
    res.send('Campus Resource Reservation API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is active at http://localhost:${PORT}`);
});