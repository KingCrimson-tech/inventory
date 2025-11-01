const pool = require("./pool")

async function seedDatabase() {
    try {
        await pool.query(`
            INSERT INTO categories (name, description) VALUES
            ('Guitars', 'Acoustic and electric guitars'),
            ('Keyboards', 'Pianos, synthesizers, and MIDI controllers'),
            ('Drums', 'Drum kits, cymbals, and percussion'),
            ('Wind Instruments', 'Flutes, saxophones, trumpets, and more'),
            ('String Instruments', 'Violins, cellos, and basses'),
            ('Accessories', 'Cables, stands, cases, and other accessories')
            ON CONFLICT (name) DO NOTHING;`)
        
        await pool.query(`
            INSERT INTO items (name, description, price, quantity, category_id, brand) VALUES
            ('Fender Stratocaster', 'Classic electric guitar', 1299.99, 5, 1, 'Fender'),
            ('Gibson Les Paul', 'Premium electric guitar', 2499.99, 3, 1, 'Gibson'),
            ('Yamaha P-45', 'Digital piano with 88 keys', 499.99, 8, 2, 'Yamaha'),
            ('Roland TD-17KVX', 'Electronic drum kit', 1699.99, 2, 3, 'Roland'),
            ('Yamaha YAS-280', 'Alto saxophone', 1099.99, 4, 4, 'Yamaha')
            ON CONFLICT DO NOTHING;`)
            
        console.log("Database seeded successfully.")
    } catch (error) {
        console.error("Error seeding database:", error)
    } finally {
        pool.end()
    }
}

seedDatabase()