const db = require('../database');
const mailer = require('../mailer');

/**
 * Running this script will email the newsletter out to 
 * each user in the database. Weather data from the weather api
 * service is cached in memory so that multiple subscriptions
 * to the same city do not result in unneccessary requests to the weather api.
 * 
 * Run: node newsLetter.js 
 */


function getSubscriptions() {
    return db.getAllSubs();
}

function sleep(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}

async function runJob() {
    const subs = await getSubscriptions();
    const cache = {};
    for(let sub of subs) {
        mailer.sendOutNewsLetter(sub.email, sub.city, cache);
        // need to sleep as to not exceed weather API request freq. limit
        await sleep(1000);
    }
    console.log("Newsletter Job Complete.");
 }

 runJob();