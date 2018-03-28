const axios = require('axios');
const request = require('request');
const db = require('../models');
const Twit = require('twit');
const twitterKey = require('../config/twitter');
const gMapKey = require('../config/gMap')
const T = new Twit(twitterKey);

module.exports = {
    findAll: (req, res) => {
        const word = req.query.keyword;
        const since = req.query.fromDate; // must be ISO format
        const until = req.query.toDate;
        // const location = '38.8976755,-77.0365298'; // replace with Gmap Geocoding <=======================================
        const radius = req.query.radius;
        const unit = 'mi'; // or km
        const language = 'en';
        const count = 20; // set number of results

        // get user's latitude and longitude
        const address = `${req.query.address}+${req.query.city}+${req.query.state}+${req.query.country}`;
        
        request
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+ address + '&key=' + gMapKey.key, (error, geoResult, body)=>{
            const bodyObj = JSON.parse(body);
            const geoLoc = bodyObj.results[0].geometry.location;
            const geoLat = geoLoc.lat;
            const geoLng = geoLoc.lng;

            console.log('\n location found: \n');
            console.log(geoLat);
            console.log(geoLng);

            const location = `${geoLat},${geoLng}`;

            const tweetParams = {
                q: word,
                // tweets by users located within a given radius of the given latitude/longitude
                geocode: `${location},${radius}${unit}`,
                since: since,
                until: until,
                lang: language,
                // show only popular tweets:
                // result_type: 'popular',
                count: count,
            }

            console.log('\n tweet params: \n');
            console.log(tweetParams);
    
            T.get('search/tweets', tweetParams)
            .then(response => {
    
                // show all data
                // console.log(response);
                console.log(response.data.statuses);
            
                console.log('\n==============================\n');
                console.log('show all users:\n');
            
                const dataInfo = response.data.statuses;
            
                for (let i = 0; i < dataInfo.length; i += 1) {
                    console.log(`user id: ${dataInfo[i].user.id}`);
                    console.log(`screen name: ${dataInfo[i].user.screen_name}`);
                    console.log(`tweet: ${dataInfo[i].text}`);
                    console.log('---------------------------');
                    console.log(`tweet id: ${dataInfo[i].id_str}`);
                    console.log(`created at: ${dataInfo[i].created_at}`);
                    console.log(`retweet count: ${dataInfo[i].retweet_count}`);
            
                    // show metadata
                    // console.log(`metadata: ${JSON.stringify(dataInfo[i].metadata)}`);
                    console.log('\n');
                }
    
                
                res.json(response.data.statuses);
            });
        });
    }
};

// // get list of user's friends
// T.get('friends/list', { screen_name: 'klonojulio' }, (err, data, response) => {
//     console.log(data);
// })

// stream tweets contains specific word
// const stream = T.stream('statuses/filter', {locations: city});
 
// stream.on('tweet', (tweet) => {
//     // console.log(tweet)

//     data = tweet;

//     console.log(data);
// })

// get all data
// all users account's following <====
// show screen name
// show tweet

// count keyword in each tweet
// save to database?
// export to charts