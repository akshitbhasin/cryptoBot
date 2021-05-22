const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');


module.exports = async function (){
    try {
        const  siteUrl = 'https://coinmarketcap.com/';

        const { data } = await axios({
            method: 'GET',
            url: siteUrl
        })

        const $ = cheerio.load(data);
        const elementSelector = 'html body.DAY div#__next div.sc-1ojz83d-1.enNDXS div.main-content div.sc-57oli2-0.dEqHl.cmc-body-wrapper div.grid div.cmc-homepage div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 table.cmc-table.cmc-table___11lFC.cmc-table-homepage___2_guh tbody tr';
       
        const keys = [
            'rank',
            'name',
            'price',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'circulatingSupply'
        ]
        const responseArray = [];
        
        $(elementSelector).each((parentIndex, parentElement)=>{
            let keyIdx = 0;
            const coinObject = {};
            
            if(parentIndex <= 9){
            $(parentElement).children().each((childIndex, childElement)=>{
                let tdValue = $(childElement).text();
                
                if(keyIdx === 1 || keyIdx === 6){
                    tdValue = $('p:first-child', $(childElement).html()).text();
                }



                if(tdValue){
                    coinObject[keys[keyIdx]] = tdValue;
                    keyIdx++;
                    // console.log(tdValue);
                }

            })
            responseArray.push((coinObject));
        }
            
        });
        return responseArray;


    } catch (error) {
        console.log(error);
    }
}