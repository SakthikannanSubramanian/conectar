const express = require("express");

const app = express();

const __PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API Running"));

app.listen(__PORT, () => console.log(`Server started on port ${__PORT}`));
