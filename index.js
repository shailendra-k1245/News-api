const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();
const apiToken = process.env.API_TOKEN;
// console.log(apiToken);

//fetchin n news article
app.post("/news/:n", async (req, res) => {
  const n = req.params.n;
  let query = req.body.title;

  axios
    .get(`https://gnews.io/api/v4/search?q=${query}&token=${apiToken}&max=${n}`)
    .then((re) => {
      res.json(re.data);
    });
});

app.get("/topheadlines/:n", async (req, res) => {
  const n = req.params.n;
  axios
    .get(`https://gnews.io/api/v4/top-headlines?token=${apiToken}&max=${n}`)
    .then((re) => {
      res.json(re.data);
    });
});

app.listen(3005, () => {
  try {
    console.log("listening on port 3005");
  } catch (err) {
    console.log("error", err);
  }
});
