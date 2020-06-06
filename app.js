const scrapeIt = require("scrape-it")

scrapeIt(`https://www.mtggoldfish.com/prices/paper/standard`, {
    "sets": {
        "listItem": "a[role='menuitem']",
        "data":  {
            "name": {
                selector: "img",
                attr: "alt"
            },
            "set": {
                attr: "href",
                convert: (h) => h.split('/').pop()
            },
            "priceUrl": {
                attr: "href",
                convert: (h) => `https://www.mtggoldfish.com/index/${h.split('/').pop()}`
            },
            "priceFoilUrl": {
                attr: "href",
                convert: (h) => `https://www.mtggoldfish.com/index/${h.split('/').pop()}_F`
            }
        }
    }
}).then(({data}) => {
    console.dir(data)
})
