const pool = require("../db/pool")

const itemsController = {
    async getAllItems(req, res) {
        try {
            const result = await pool.query(`
                select items.*, categories.name as category_name
                from items
                join categories on items.category_id = categories.id
                order by items.name
                `)
            res.render('items/index', {
                title: "ALl items",
                items: result.rows
            })
        } catch (error) {
            console.error("Error fetching items:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async getItemById(req, res) {
        const { id } = req.params
        try {
            const result = await pool.query(`
                select items.*, categories.name as category_name
                from items
                join categories on items.category_id = categories.id
                where items.id = $1
                `, [id])
            if (result.rows.length === 0) {
                return res.status(404).send("Item not found")
            }
            res.render('items/detail', {
                title: "Item Details",
                item: result.rows[0]
            })
        } catch (error) {
            console.error("Error fetching item by ID:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async getCreateForm(req, res) {
        try {
            const categoriesResult = await pool.query(`select * from categories order by name`)
            res.render('items/create', {
                title: "Add New Item",
                categories: categoriesResult.rows
            })
        } catch (error) {
            console.error("Error fetching categories:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async createItem(req, res) {
        try {
            const { name, description, price, quantity, category_id, brand, image_url } = req.body
            await pool.query(`
                insert into items (name, description, price, quantity, category_id, brand, image_url)
                values ($1, $2, $3, $4, $5, $6, $7)
                `, [name, description, price, quantity, category_id, brand, image_url])
            res.redirect('/items')
        } catch (error) {
            console.error("Error creating item:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async getEditForm(req, res) {
        try {
            const { id } = req.params
            const itemResult = await pool.query(`select * from items where id = $1`, [id])
            const categoriesResult = await pool.query(`select * from categories order by name`)
            if (itemResult.rows.length === 0) {
                return res.status(404).send("Item not found")
            }
            res.render('items/edit', {
                title: "Edit Item",
                item: itemResult.rows[0],
                categories: categoriesResult.rows
            })
        } catch (error) {
            console.error("Error fetching edit form:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async updateItem(req, res) {
        try {
            const { id } = req.params
            const { name, description, price, quantity, category_id, brand, image_url } = req.body
            await pool.query(`
                update items
                set name = $1, description = $2, price = $3, quantity = $4, category_id = $5, brand = $6, image_url = $7
                where id = $8
                `, [name, description, price, quantity, category_id, brand, image_url, id])
            res.redirect('/items')
        } catch (error) {
            console.error("Error updating item:", error)
            res.status(500).send("Internal Server Error")
        }
    },

    async deleteItem(req, res) {
        try {
            const { id } = req.params
            await pool.query(`delete from items where id = $1`, [id])
            res.redirect('/items')
        } catch (error) {
            console.error("Error deleting item:", error)
            res.status(500).send("Internal Server Error")
        }
    }
}

module.exports = itemsController