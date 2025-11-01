const fs = require("fs");
const pool = require("./pool");
const path = require("path");

async function initDB() {
  try {
    console.log("Initializing database...");

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);

    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  } finally {
    await pool.end();
    console.log("🔒 Database connection closed.");
  }
}

initDB();