let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const path = require("path");
const indexPath = path.resolve("./views/index.html");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(indexPath);
});
app.get("/json", (req, res) => {
    res.json({ message: "hello json" });
});

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time,
        });
    }
);

app.get(
    "/:word/echo",
    (req, res) => {
        res.send({
            echo: req.params.word
        });
    }
);

app.post(
    "/name",
    (req, res) => {
        var { first: firstName, last: lastName } = req.body;
        res.json({
            name: `${firstName} ${lastName}`
        });
    }
);

module.exports = app;
