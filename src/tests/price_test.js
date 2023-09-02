Feature('price');

Scenario('test something',  async ({ I }) => {
    
    const fantomResp = await I.sendGetRequest("feedStats/Fantom/0xfB98B335551a418cD0737375a2ea0ded62Ea213b");
    const fantomDIA = parseFloat(fantomResp.data.Price).toFixed(2);
    console.log(`AT Fantom - DIA, 1 miMATIC == ${fantomDIA} usdc`);

    const polygonResp = await I.sendGetRequest("feedStats/Polygon/0xa3Fa99A148fA48D14Ed51d610c367C61876997F1");
    const polygonDIA = parseFloat(polygonResp.data.Price).toFixed(2);
    console.log(`AT Polygon - DIA, 1 miMATIC == ${polygonDIA} usdc`);
    
    const fantomUrl = 'https://coinmarketcap.com/dexscan/fantom/0x4de9f0ed95de2461b6db1660f908348c42893b1a/#TradeHistory';
    const polygonUrl = 'https://coinmarketcap.com/dexscan/polygon/0xdb0f14d1f18d3b70ad3a55f8af31c435bdd1bfba/';
    const targetClass = 'sc-16891c57-0.tLXbF';

    const coinmarketcap = require("./coinmarketcap");
    
    const cmcFantom = parseFloat(await coinmarketcap.fetchInputValue(fantomUrl, targetClass)).toFixed(2);
    console.log(`AT Fantom - CoinMarketCap, 1 miMATIC == ${cmcFantom} usdc`);

    const cmcPolygon = parseFloat(await coinmarketcap.fetchInputValue(polygonUrl, targetClass)).toFixed(2);
    console.log(`AT Polygon - CoinMarketCap, 1 miMATIC == ${cmcPolygon} usdc`);
  

    const resp = await coinmarketcap.uploadPrices(fantomDIA,cmcFantom,polygonDIA,cmcPolygon);


});
