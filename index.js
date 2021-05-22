var express = require('express');
var getPrice = require('./cryptoScrapping');
const port = 3000 || process.env;
const result =  getPrice();
const app = express();

const currencyRoutes = require('./handlers')
const returnCurrencyArray = currencyRoutes.returnCurrencyArray;
result.then(function(resultPromise){
    app.get('/', (req, res)=>{
        try {
            res.json(resultPromise);
        } catch (error) {
            console.log(error);
        }
    })
    app.get('/:currency', (req, res)=>{
        let currency = req.path;
        res.json(returnCurrencyArray(currency.substring(1), resultPromise));
    })
})
app.get('/test', (req, res)=>{
    
    res.send('This is working');
})
app.listen(port, ()=>{
    console.log(`Listening to ${port}`);
})