import { COOKIE_CONTENT } from "../constants";

import puppeteer from "puppeteer";
import fs from "fs";

import sections from "./section_numbers.json";
import lastSectionIndex from "./next_section_index_to_download.json";

const url = "https://www.telecompra.mercadona.es/ns/lista.php";

const NUMBER_OF_SECTIONS_TO_DOWNLOAD_AT_A_TIME = 20;

const downloadSection = async (id: number) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ Cookie: COOKIE_CONTENT });

  const full_url = `${url}?id_seccion=${id}`;
  console.log("Visiting " + full_url);
  await page
    .goto(full_url, { waitUntil: "networkidle0" })
    .catch((err) => console.error(err));
  await page.waitForTimeout(1000);
  const html = await page.content();
  fs.writeFileSync(`data/sections/section_${id}_raw.html`, html);
  await browser.close();
};

let i: number;
for (
  i = lastSectionIndex;
  i < lastSectionIndex + NUMBER_OF_SECTIONS_TO_DOWNLOAD_AT_A_TIME;
  ++i
) {
  if (i >= sections.length) {
    console.log("No more sections left to download");
    break;
  }
  const sectionNumber = sections[i];
  console.log("Downloading section " + sectionNumber);
  downloadSection(sectionNumber);
}

fs.writeFileSync(`src/next_section_index_to_download.json`, i.toString());
