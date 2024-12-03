import express from "express";
import cors from "cors";

import boardgames from "./data/boardgames.json"
import { json } from "express/lib/response";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/boardgames", (req, res) => {
  const category = req.query.category
  console.log(category)

  const filteredBoardgames = boardgames.filter(game => game.category.toLowerCase() === category)
  
  res.json(filteredBoardgames)
})

app.get("/boardgames/:id", (req, res) => {
  const id =req.params.id

  const boardgame = boardgames.find(game => game.id === +id)
  if (boardgame) {
    res.status(200).json(boardgame)
  } else {
    res.status(404).send("No game found with that ID")
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
