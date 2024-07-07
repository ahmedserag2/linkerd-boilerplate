const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.status(200).send('Service C: Response delayed but successful.');
    }, 10000); // Delay response for 10 seconds
});

app.listen(PORT, () => {
    console.log("Service C running on port " + PORT);
});