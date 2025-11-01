const pool = require("../db/pool")

const categotriesController = {
    async getAllCategories(req, res) {
        try {
            const result = await pool.query("SELECT * FROM categories ORDER BY name")
            res.render('categories/index', {
                title: "Categories",
                categories: result.rows
            })
        } catch (error) {
            console.error("Error fetching categories:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    },

    async getCategoryById(req, res){
        try {
            const { id } = req.params
            const categoryResult = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
            const itemsResult = await pool.query("SELECT * FROM items WHERE category_id = $1 ORDER BY name", [id])
            
            if (categoryResult.rows.length === 0) {
                return res.status(404).send({ error: "Category not found" })
            }

            res.render('categories/show', {
                title: categoryResult.rows[0].name,
                category: categoryResult.rows[0],
                items: itemsResult.rows
            })
        } catch (error) {
            console.error("Error fetching category:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    },

    getCreateForm(req, res){
        res.render('categories/create', {
            title: "Add New Category"
        })
    },

    async createCatorgory(req, res){
        try {
            const {name, description } = req.body
            await pool.query(
                "insert into categories (name, description) calues ($1, $2)",
                [name, description]
            )
            res.redirect('/categories')
        } catch (error) {
            console.error("Error creating category:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    },

    async getEditForm(req, res){
        try {
            const { id } = req.params
            const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
            
            if (result.rows.length === 0) {
                return res.status(404).send({ error: "Category not found" })
            }

            res.render('categories/edit', {
                title: "Edit Category",
                category: result.rows[0]
            })  
        } catch (error) {
            console.error("Error fetching category for edit:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    },

    async updateCategory(req, res){
        try {
            const { id } = req.params
            const { name, description } = req.body
            await pool.query(
                "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
                [name, description, id]
            )
            res.redirect('/categories/' + id)
        } catch (error) {
            console.error("Error updating category:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    },

    async deleteCategory(req, res){
        try {
            const { id } = req.params
            await pool.query("DELETE FROM categories WHERE id = $1", [id])
            res.redirect('/categories')
        } catch (error) {
            console.error("Error deleting category:", error)
            res.status(500).send({ error: "Internal Server Error" })
        }
    }   
}

module.exports = categoriesController