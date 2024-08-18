const express = require("express");

const path = require("node:path");
const db = require('./db/queries')


const app = express();
const PORT = process.env.PORT || 3000;



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const allItems = await db.getAllItems();
    res.render('home', {items: allItems});
});









app.listen(PORT, () => console.log(`server listening on port ${PORT}!`));