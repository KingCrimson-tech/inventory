const express = require("express")
const app = express()
const path = require("path")
require('dotenv').config()

//views setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true}))

//routes
const indexRouter = require("./routes/index")
const categoriesRouter = require("./routes/categories")
const itemsRouter = require("./routes/items")

app.use('/', indexRouter)
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter)

app.use((req, res) => {
    res.status(404).render("404", {title: "Page not found"})
})

module.exports = app