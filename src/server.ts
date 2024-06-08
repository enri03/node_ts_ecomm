import app from "./app";
import dotenv from "dotenv";
import { testDatabaseConnection } from "./utilities/testDB";

dotenv.config();
const PORT = process.env.PORT || 5000;

testDatabaseConnection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
