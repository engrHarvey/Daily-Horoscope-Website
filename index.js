import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import axios from "axios";

const app = express()
const port = 3000

const API_URL = "https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/";
const yourAPIKey = process.env.DAILY_HORSCOPE_API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("index.ejs");
});

app.post("/daily-horoscope", async (req, res) => {

  var sign = req.body.choice;
  const options = {
    method: 'GET',
    url: API_URL,
    params: {zodiacSign: sign},
    headers: {
      'x-rapidapi-key': yourAPIKey,
      'x-rapidapi-host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'
    }
  };
  
  try {
    const result = await axios.request(options);
    console.log(result.data);
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    res.render("index.ejs", {
      sign: capitalizeFirstLetter(sign),
      prediction: result.data.prediction, 
      number: result.data.number,
      color: result.data.color,
      mantra: result.data.mantra,
      remedy: result.data.remedy,
    });
  } catch (error) {
    console.error(error);
  }
});


app.listen(port, () => {
  console.log(`Server app listening on port ${port}!`);
});