const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('Service A: Everything is running smoothly!');
});

app.listen(PORT, () => {
    console.log("Service A running on port " + PORT);
});