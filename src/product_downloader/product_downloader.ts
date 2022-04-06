import axios from "axios";
import { COOKIE_CONTENT } from "../constants";
import https from "https";
import fs from "fs";

const url = "https://www.telecompra.mercadona.es/detall_producte.php";

const AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const downloadProduct = (id: string) => {
  AxiosInstance.get(`${url}?id=${id}`, {
    headers: {
      Cookie: COOKIE_CONTENT,
    },
  })
    .then((response) => {
      const html = response.data;
      fs.writeFileSync(`data/product_${id}_raw.html`, html);
    })
    .catch(console.error);
};

downloadProduct("72515");
