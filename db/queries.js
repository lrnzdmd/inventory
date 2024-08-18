const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items JOIN categories ON items.categoryid = categories.id JOIN brands ON items.brandid = brands.id");
    return rows;  
}

async function addNewItem(catId, brandId, name, price) {
    await pool.query("INSERT INTO items (categoryid, brandid, name, price) VALUES ($1, $2, $3, $4)",[catId, brandId, name, price])
}

async function getItemById(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    return rows;
}

async function getAllCategory(category) {
    const { rows } = await pool.query("SELECT * FROM items JOIN categories ON items.categoryid = categories.id WHERE categories.categoryname = $1;", [category]);
    return rows;  
}

module.exports = { getAllItems, addNewItem, getItemById, getAllCategory };