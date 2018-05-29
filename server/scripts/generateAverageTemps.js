const fs = require('fs');
const {cities} = require('../client/src/cities');
let avgTemps = {};

/**
 * return a random interger between 50 ad 70.
 */
function randomTemp() {
    const MIN = 50;
    const MAX = 70;
    return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

/**
 * Write average temperature data to a ./average_temps.json
 * @param {Object} data 
 */
function writeDataToFile(data) {
    const FILE = './average_temps.json';
    fs.writeFile(FILE, data, (error) => {
        if(error) {
            console.log(error);
        }
        console.log(`Data written to ${FILE}`);
    });
}

/**
 * Generate the avg temps data and write it to a file.
 */
function generateData() {
    for(let i of cities) {
        avgTemps[i] = randomTemp();
    }
    writeDataToFile(JSON.stringify(avgTemps));
}

generateData();