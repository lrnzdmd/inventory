const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT items.id, name, categoryname, price, brandname FROM items JOIN categories ON items.categoryid = categories.id JOIN brands ON items.brandid = brands.id ORDER BY categoryname ASC;");
    return rows;  
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT categoryname FROM categories ORDER BY categoryname ASC;");
    return rows;

}

async function getAllCategoryBrands(category) {
    const { rows } = await pool.query("SELECT DISTINCT brandname FROM items JOIN categories ON items.categoryid = categories.id JOIN brands ON items.brandid = brands.id WHERE categories.categoryname = $1 ORDER BY brandname ASC;", [category]);
    return rows;

}

async function addNewItem(category, brand, name, price) {
    let result = await pool.query(
        `INSERT INTO categories (categoryname) 
         VALUES ($1) 
         ON CONFLICT (categoryname) 
         DO UPDATE SET categoryname = EXCLUDED.categoryname 
         RETURNING id`, 
        [category]
    );
    const categoryId = result.rows[0].id;

    result = await pool.query(
        `INSERT INTO brands (brandname) 
         VALUES ($1) 
         ON CONFLICT (brandname) 
         DO UPDATE SET brandname = EXCLUDED.brandname 
         RETURNING id`, 
        [brand]
    );
    const brandId = result.rows[0].id;

    await pool.query(
        `INSERT INTO items (categoryid, brandid, name, price) 
         VALUES ($1, $2, $3, $4)`, 
        [categoryId, brandId, name, price]
    );
}

async function getItemById(id) {
    const { rows } = await pool.query("SELECT items.id, name, categoryname, price, brandname FROM items WHERE id = $1", [id]);
    return rows;
}

async function getAllItemsFromCategory(category) {
    const { rows } = await pool.query("SELECT items.id, name, categoryname, price, brandname FROM items JOIN categories ON items.categoryid = categories.id JOIN brands ON items.brandid = brands.id WHERE categories.categoryname = $1;", [category]);
    return rows;  
}

async function getAllItemsFromCatAndBrand(category, brand) {
    const { rows } = await pool.query("SELECT items.id, name, categoryname, price, brandname FROM items JOIN categories ON items.categoryid = categories.id JOIN brands ON items.brandid = brands.id WHERE categories.categoryname = $1 AND brands.brandname = $2;", [category, brand]);
    return rows;  
}

async function deleteItem(itemid) {
    await pool.query("DELETE FROM items WHERE id = $1", [itemid])
}

async function deleteCategory(category) {
    await pool.query("DELETE FROM categories WHERE categoryname = $1;", [category]);
}

module.exports = { getAllItems, 
                    getAllCategories, 
                    getAllCategoryBrands, 
                    addNewItem, 
                    deleteItem, 
                    deleteCategory, 
                    getItemById, 
                    getAllItemsFromCategory,  
                    getAllItemsFromCatAndBrand 
                };