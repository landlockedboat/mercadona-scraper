import fs from "fs";

const folder = "data/sections/";

//InsertaLinea({72205}
const regex = /(?<=InsertaLinea\()\d+/g;

let allProductNumbers: number[] = [];

fs.readdirSync(folder).forEach((file) => {
  const data = fs.readFileSync(`${folder}/${file}`).toString();
  const matches = data.match(regex);

  if (!matches) {
    return;
  }

  matches.forEach((match) => {
    allProductNumbers.push(Number.parseInt(match));
  });
});

const res = JSON.stringify(allProductNumbers);
fs.writeFileSync(`src/product_numbers.json`, res);
