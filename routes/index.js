const express = require("express")
const router = express.Router()
const pool = require("../db/pool")

router.get('/', async (req, res) => {
    try {
        const categoriesCount = await pool.query("SELECT COUNT(*) FROM categories")
        const itemsCount = await pool.query("SELECT COUNT(*) FROM items")
        const recentItems = await pool.query("SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id ORDER BY items.created_at DESC LIMIT 5")

        res.render("index", {
            title: "Musical Inventory Shop",
            categoriesCount: categoriesCount.rows[0].count,
            itemsCount: itemsCount.rows[0].count,
            recentItems: recentItems.rows
        })
    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router