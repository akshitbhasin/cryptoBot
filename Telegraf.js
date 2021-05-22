const request = require('request');
const { Telegraf } = require('telegraf');
const { Keyboard, Key } = require('telegram-keyboard');
const messageBuild = require('./handlers');
const MessageBuilder = messageBuild.MessageBuilder; 
const token = 'YOUR_TOKEN_HERE';
const channelName = 'YOUR_CHANNEL_HERE';
const bot = new Telegraf(token);
var kb =  [
    [{
            text: "Bitcoin",
            callback_data: 'Bitcoin'
        },
        {
            text: "Ethereum",
            callback_data: 'Ethereum'
        }],
        [{
            text: "BinanceCoin",
            callback_data: 'BinanceCoin'
        },
        {
            text: "Cardano",
            callback_data: 'Cardano'
        }],
        [{
            text: "Tether",
            callback_data: 'Tether'
        },
        {
            text: "XRP",
            callback_data: 'XRP'
        }],
        [{
            text: "Dogecoin",
            callback_data: 'Dogecoin'
        },
        {
            text: "Polkadot",
            callback_data: 'Polkadot'
        }],
        [{
            text: "InternetComputer",
            callback_data: 'InternetComputer'
        },
        {
            text: "BitcoinCash",
            callback_data: 'BitcoinCash'
        },
    ],[{text: "Back", callback_data: 'start'}]

]
var currencies = [
    'Bitcoin',
    'Ethereum',
    'BinanceCoin',
    'Cardano',
    'Tether',
    'XRP',
    'Dogecoin',
    'Polkadot',
    'InternetComputer',
    'BitcoinCash',
    'default'
];

function sendCryptoKeyboard(ctx){
    let introMessage = `Great! Please choose a Currency below`;
    ctx.deleteMessage();    
    bot.telegram.sendMessage(ctx.chat.id, introMessage, {
        reply_markup: { inline_keyboard: kb}
    })

}

bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name} :)\r\nWelcome to CryptoBot! \r\nPlease choose suitable commands with the "/" icon.`))
bot.action('start', (ctx)=> {
    ctx.deleteMessage();
    // ctx.reply(`Hello ${ctx.from.first_name} :)\r\nWelcome to CryptoBot! \r\nPlease choose suitable commands with the "/" icon.`)
})
bot.command('crypto', ctx => 
{
    console.log(ctx)
    sendCryptoKeyboard(ctx);    

})
bot.action('crypto', ctx =>{
    sendCryptoKeyboard(ctx);
})

bot.action(currencies, (ctx)=>{
    console.log(ctx.match[0]);
    {
        let url = "http://[::1]:3000/"+ ctx.callbackQuery.data;
            let options = {json: true};
            try{    
            request(url, options, (error, res, body) => 
            {
                if (error) 
                return  console.log(error)
        
                if (!error && res.statusCode == 200){
                    ctx.deleteMessage(); 
                    console.log(ctx)
                    bot.telegram.sendMessage(ctx.chat.id, MessageBuilder(body), {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {text: 'Back to Cryptos', callback_data: 'crypto'}
                                ]
                            ]
                        }
                    });
                    console.log("Request sent to ",url ,"and Data Sent for ",ctx.callbackQuery.data);
                    
                }
            });}
            catch(error){
                ctx.telegram.sendMessage(ctx.chat.id, "Could Not complete request.", {
                    reply_Markup: {
                        inline_keyboard: [
                            [{text: 'Back to Cyptos', callback_data: 'crypto'}]
                        ]
                    }
                });
            }
        }
        

})








bot.launch();
