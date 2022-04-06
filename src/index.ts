import axios from "axios";
import { COOKIE_CONTENT } from "./constants";
import https from "https";
import fs from "fs";

import productNumbers from "./shared/product_numbers.json";
import nextProductIndex from "./next_product_index_to_download.json";

const url = "https://www.telecompra.mercadona.es/detall_producte.php";

const NUMBER_OF_PRODUCTS_TO_DOWNLOAD_AT_A_TIME = 1000;

const AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const downloadProduct = (id: number) => {
  AxiosInstance.get(`${url}?id=${id}`, {
    headers: {
      Cookie: COOKIE_CONTENT,
    },
  })
    .then((response) => {
      const html = response.data;
      fs.writeFileSync(`data/products/product_${id}_raw.html`, html);
    })
    .catch(console.error);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  let i: number;
  for (
    i = nextProductIndex;
    i < nextProductIndex + NUMBER_OF_PRODUCTS_TO_DOWNLOAD_AT_A_TIME;
    ++i
  ) {
    if (i >= productNumbers.length) {
      console.log("No more sections left to download");
      break;
    }
    const productNumber = productNumbers[i];
    console.log("Downloading product " + productNumber);
    downloadProduct(productNumber);

    const timeToWait = Math.floor(Math.random() * 10000) + 5000;
    console.log(`Waiting ${timeToWait / 1000} seconds...`);
    await delay(timeToWait);
  }

  fs.writeFileSync("src/next_product_index_to_download.json", i.toString());
})();
