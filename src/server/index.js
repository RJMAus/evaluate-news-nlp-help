const dotenv = require('dotenv');
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(express.static('dist'));

// working
const API_KEY = process.env.API_KEY;
console.log(`API Key: ${API_KEY}`); 

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})
console.log(`Dir: ${__dirname}`)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

console.log('loading test function...')
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


console.log('loading meaningcloud functions...')
// Get meaning cloud data
app.get('/meaningCloud', returnMeaningCloudData);
async function returnMeaningCloudData(req, res) {
    // Construct URL
    const testLink = "https://www.functionize.com/blog/nlp-teaching-a-computer-to-understand-test-plans";
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&url=${testLink}`;
    console.log(url);
    const newData = await getMeaningCloud(url);
    console.log(newData);
    res.send(newData);
}


const getMeaningCloud = async (url = "") => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

app.post('/meaningCloud', returnMeaningCloudData);
    async function returnMeaningCloudData(req, res){
        // Construct URL
        const userLink = req.body.url;
        const url = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&url=${userLink}`;
        console.log(url);
        const newData = await getMeaningCloud(url);
        const outputObj = {
            model : newData.model,
            score_tag : newData.score_tag,
            agreement : newData.agreement,
            subjectivity : newData.subjectivity,
            confidence : newData.confidence,
            irony : newData.irony
        }
        console.log(outputObj);
        res.send(outputObj);
    }
    
app.get('/getAPIKey', function (req,res){
    const textapi = API_KEY;
    res.send({textapi});
})

console.log('All server functions loaded')