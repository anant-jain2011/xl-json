const XLSX = require("xlsx");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let jsonData;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.post("/upload",
    bodyParser.urlencoded({
        extended: true,
    }),
    (req, res) => {
        const data = req.body.bin;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);
        res.status(200).json(jsonData);
    });

app.get("/result", (req, res) => {
    res.json(jsonData)
});

app.listen(3000, () => {
    console.log("server running on 3000 port")
});