import express from "express";
import "dotenv/config";
import Router from "./src/router/user.router.js";
import cors from "cors";
const app = express();
const port = 3005;

app.use(express.json()); // REQ.BODY
app.use(express.static("public"));
app.use(cors());
app.use(Router); // ROUTER USER

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Server Running !!!");
});


app.get("/login", (req, res) => {
    res.send("Anda sudah login");
});