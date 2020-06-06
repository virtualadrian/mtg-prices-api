const scrapeIt = require("scrape-it")

let sets = []

const setUrls = [
    `https://www.mtggoldfish.com/prices/paper/standard`,
    `https://www.mtggoldfish.com/prices/paper/pioneer`,
    `https://www.mtggoldfish.com/prices/paper/modern`
]

const getSetsFromUrl = (url) => {

}

scrapeIt(`https://www.mtggoldfish.com/prices/paper/standard`, {
    "sets": {
        "listItem": ".priceList-set-header-link:has(> img.priceList-set-icon)",
        "data":  {
            "name": {
                selector: "img.priceList-set-icon",
                attr: "alt"
            },
            "set": {
                attr: "href",
                convert: (h) => h.split('/').pop()
            },
            "priceUrlBase": {
                attr: "href",
                convert: (h) => `https://www.mtggoldfish.com/index/${h.split('/').pop()}`
            }
        }
    }
}).then(({data}) => {
    sets = [...data.sets]
})
