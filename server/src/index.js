import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙ SERVER IS LISTENING ON PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION FAILED: ", error);
  });


