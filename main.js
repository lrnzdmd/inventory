const express = require("express");

const path = require("node:path");
const db = require('./db/queries')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.get("/", async (req, res) => {
    const allItems = await db.getAllItems();
    const allCats = await db.getAllCategories();
    res.render('home', {items: allItems, categories: allCats, path: req.path});
});

app.get("/categories/:catname", async (req, res) => {
    const items = await db.getAllItemsFromCategory(req.params.catname);
    const allCats = await db.getAllCategories();
    const catBrands = await db.getAllCategoryBrands(req.params.catname);
    
 
    res.render("category", { items: items, categories: allCats, brands: catBrands, path: req.path});
   
    
  })

app.get("/categories/:catname/:brandname", async (req,res) => {
    const items = await db.getAllItemsFromCatAndBrand(req.params.catname, req.params.brandname);
    const allCats = await db.getAllCategories();
    const catBrands = await db.getAllCategoryBrands(req.params.catname, req.params.brandname);
    res.render("category",  { items: items, categories: allCats, brands: catBrands, path: req.path} )
})

app.get("/delete", (req,res) => {
    const itemid = req.query.itemid;
    const adminpass = req.query.adminpass;
    if (adminpass !== process.env.ADMIN_PASS) {
        res.redirect('/forbidden');
    } else {
        db.deleteItem(itemid);
        res.redirect('/');
    }

})

app.get("/new", async (req,res) => {
    const allCats = await db.getAllCategories();
    const catBrands = await db.getAllCategoryBrands(req.params.catname, req.params.brandname);
    res.render("new",{categories: allCats, brands: catBrands, path: req.path});
})

app.post("/insert", (req,res) => {
    if (req.body.adminpass !== process.env.ADMIN_PASS) {
    res.redirect("/forbidden");
    } else {
        db.addNewItem(req.body.category, req.body.brand, req.body.name, req.body.price);
        res.redirect("/");
    }
})

app.get("/forbidden", (req, res) => {
    res.render("forbidden");
})

app.get("*", (req,res) => {
    res.status(404).render("404");
})






app.listen(PORT, () => console.log(`server listening on port ${PORT}!`));