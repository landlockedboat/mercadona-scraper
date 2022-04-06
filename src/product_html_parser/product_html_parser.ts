import axios from "axios";
import cheerio from "cheerio";
import { COOKIE_CONTENT } from "../constants";
//import { SAMPLE_HTML_STRING } from "./sample.string";
const https = require("https");

const url = "https://www.telecompra.mercadona.es/detall_producte.php?id=27368"; // URL we're scraping

const AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// This is the structure of the player data we recieve
interface PlayerData {
  rank: number; // 1 - 20 rank
  name: string;
  nationality: string;
  goals: number;
}

const processHtml = (html) => {
  const $ = cheerio.load(html); // Load the HTML string into cheerio
  let product = { description: "" };
  product.description = $(".contenido > div:first-child").data();
  console.log(
    "🚀 ~ file: index.ts ~ line 27 ~ processHtml ~",
    $(".contenido > div:first-child").children().remove().end().text()
  );

  console.log(product);

  /* const statsTable: cheerio.Cheerio = $(".statsTableContainer > tr"); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
  const topScorers: PlayerData[] = [];

  statsTable.each((i, elem) => {
    const rank: number = parseInt($(elem).find(".rank > strong").text()); // Parse the rank
    const name: string = $(elem).find(".playerName > strong").text(); // Parse the name
    const nationality: string = $(elem).find(".playerCountry").text(); // Parse the country
    const goals: number = parseInt($(elem).find(".mainStat").text()); // Parse the number of goals
    topScorers.push({
      rank,
      name,
      nationality,
      goals,
    });
  });

  console.log(topScorers); */
};

//processHtml(SAMPLE_HTML_STRING.toString());

/* // Send an async HTTP Get request to the url
AxiosInstance.get(url, {
  headers: {
    Cookie: COOKIE_CONTENT,
  },
})
  .then(
    // Once we have data returned ...
    (response) => {
      const html = response.data; // Get the HTML from the HTTP request
      console.log("🚀 ~ file: index.ts ~ line 28 ~ html", html);
    }
  )
  .catch(console.error); */ // Error handling
