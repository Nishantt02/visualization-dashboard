import fs from "fs";
import dotenv from "dotenv";
import connectDb from "./db.js";
import Data from "./models/Schema.js";

dotenv.config();

await connectDb();

const jsonData = JSON.parse(
  fs.readFileSync("./data/jsondata.json", "utf-8")
);

await Data.deleteMany({});
await Data.insertMany(jsonData);

console.log("Data inserted successfully");
process.exit();