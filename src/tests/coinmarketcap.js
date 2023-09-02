const axios = require('axios');
const cheerio = require('cheerio');
const { addDoc, collection } = require('firebase/firestore');
const {db} = require('./firebaseConnection');

module.exports = {
    async fetchInputValue(url, targetClass) {
        try {
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
          const inputValue = $(`div.${targetClass} input`).attr('value');
          return inputValue;
        } catch (error) {
           throw error;
        }
    },

    async  uploadPrices(a,b,c,d) {

        const currentTime = await this.formatTimestamp(Date.now());
        var myObj1 = {
            "network": "polygon",
            "dia" : a,
            "coinmarketcap" : b,
            "comparison" : a - b,
            "time" : currentTime
        };
        var myObj2 = {
            "network": "fantom",
            "dia" : c,
            "coinmarketcap" : d,
            "comparison" : c - d,
            "time" : currentTime
        };

        await addDoc(collection(db,'/matic-comparison-history'),myObj1);
        await addDoc(collection(db,'/matic-comparison-history'),myObj2);
    },

    async formatTimestamp(timestamp){
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based.
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
}




