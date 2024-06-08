import database from "../database";
import Product, { ProductMap } from "../models/product";

const products = [
  {
    name: "Example Product 1",
    description: "This is an example product description.",
    price: 19.99,
    stockQuantity: 100,
    category: "Example Category",
  },
  {
    name: "Example Product 2",
    description: "This is an example product description 2.",
    price: 29.99,
    stockQuantity: 100,
    category: "Example Category",
  },
  {
    name: "Example Product 3",
    description: "This is an example product description 3.",
    price: 30.99,
    stockQuantity: 100,
    category: "Example Category",
  },
  {
    name: "Example Product 4",
    description: "This is an example product description 4.",
    price: 50.99,
    stockQuantity: 100,
    category: "Example Category",
  },
  // Add more products as needed
];

const seedDatabase = async () => {
  try {
    ProductMap(database);

    // Drop the sequence if it exists (replace 'products_id_seq' with the actual sequence name if different)
    await database.query("DROP SEQUENCE IF EXISTS products_id_seq CASCADE;", {
      raw: true,
    });

    // Now sync the model which will recreate the table and the sequence
    await Product.sync({ force: true }); // This will drop the table if it exists and create a new one

    const result = await Product.bulkCreate(products);
    console.log(`${result.length} Products created successfully.`);
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
};

seedDatabase();
