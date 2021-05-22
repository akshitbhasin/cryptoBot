exports.returnCurrencyArray = function(currency, resultPromise){
    var currencies = {
        'Bitcoin': 0,
        'Ethereum': 1,
        'BinanceCoin': 2,
        'Cardano': 3,
        'Tether': 4,
        'XRP': 5,
        'Dogecoin': 6,
        'Polkadot': 7,
        'InternetComputer': 8,
        'BitcoinCash': 9,
        'default': 'Invalid'
        
    };
    return (resultPromise[currencies[currency]]) || resultPromise[currency['default']];

}
 exports.MessageBuilder = function modifier(body){
    let resstring =''
    delete body.rank
    for (var key in body) {
        resstring += ( key + " : " + body[key]+ "\r\n");
      }   
     return (resstring); 
}

