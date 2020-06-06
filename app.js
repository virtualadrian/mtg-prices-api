const scrapeIt = require("scrape-it")
const X2JS = require('x2js');
const fs = require('fs');


// scrapeIt("https://www.mtggoldfish.com/index/RNA#paper", {
// scrapeIt("http://localhost:3000/rna", {
const set = "THB"
scrapeIt(`https://www.mtggoldfish.com/index/${set}#paper`, {
    "card": {
        "listItem": "div.index-price-table-paper > table > * > tr",
        "data":  {
            "name": "td:nth-of-type(1) > a",
            "set": "td:nth-of-type(2)",
            "rarity": "td:nth-of-type(3)",
            "price": "td:nth-of-type(4)"
        }
    }
}).then(({data}) => {
    const x2 = new X2JS();
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?><cards>${x2.js2xml(data)}</cards>`
    fs.writeFile(`${set}data.xml`, header, () => {
        console.log("DONE");
    })
})
