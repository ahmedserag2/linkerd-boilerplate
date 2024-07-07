const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    
    // Introduce a random failure
    if (Math.random() < 0.5) { // 50% chance to fail
        res.status(500).send('Service B: internal server error :(');
    }
    
    
    res.status(200).send('Service B: Everything is running smoothly!');
    
});


app.listen(PORT, () => {
    console.log("Service B running on port " + PORT);
});