'use strict';

const Hapi = require('@hapi/hapi');

const scrapeIt = require("scrape-it");
const X2JS = require('x2js');
const fs = require('fs');


const getSetCode = async (request, h) => {
    return await scrapeIt(`https://www.mtggoldfish.com/index/${request.params.code}#paper`, {
        "card": {
            "listItem": "div.index-price-table-paper > table > * > tr",
            "data": {
                "name": "td:nth-of-type(1) > a",
                "set": "td:nth-of-type(2)",
                "rarity": "td:nth-of-type(3)",
                "price": "td:nth-of-type(4)"
            }
        }
    }).then(({data}) => {
        if (request.params.type === 'json') {
            return h
                .response(JSON.stringify(data))
                .type('application/json')
                .code(200);
        } else {
            const x2 = new X2JS();
            return h.response(`<?xml version="1.0" encoding="UTF-8" standalone="no" ?><cards>${x2.js2xml(data)}</cards>`)
                .type('application/xml')
                .code(200);
        }
    });
}


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/set/{code}/{type}',
        handler: getSetCode
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();