const express = require('express')

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/test', (req, res, next) => {

    res.send("Hello from dept")
});


app.listen(PORT, () => console.log(`app listening on port ${PORT}`));