import express from "express";
import cors from "cors";
// import { getElection } from "./controllers/uselection";
import { getUsElectionResult } from "./controllers/uselection.js";
import { getEthData } from "./controllers/ethereum.js";
import { getIndiaElectionResult } from "./controllers/indiaelection.js";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/us", getUsElectionResult);
app.get("/india", getIndiaElectionResult);
app.get("/ethereum", getEthData);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
