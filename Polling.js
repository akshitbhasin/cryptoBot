const request = require('request');
let i =0;
let low = 41251.57;
let high = 2500.50;

function poll(currency, lowerLimit, upperLimit)
{
    
    const options = {
    url: 'http://localhost:3000/'+currency,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};

request(options, function(err, res, body) {
    // let json = JSON.parse(body);
    if(err)
    console.log(err);
    console.log(body);
    // console.log(res);
});  
} 

var timer = setInterval(() => {
    ++i
    poll('Bitcoin', low, high);
    if(i>1)
    clearInterval(timer);
        
}, 2000);



