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
        const since = req.query.fromDate; // must be ISO format standard key allows 7 days only check details here: https://developer.twitter.com/en/docs/tweets/search/overview
        const until = req.query.toDate;
        const radius = req.query.radius;
        const unit = req.query.unit;
        const language = req.query.language;
        const count = 100; // set number of results default: 15 max 100

        // get user's latitude and longitude
        const address = `${req.query.address}+${req.query.city}+${req.query.state}+${req.query.country}`;

        // send request to Google Maps. if use Twitter Premium, don't need this, add condition to query
        request
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+ address + '&key=' + gMapKey.key, (error, geoResult, body)=>{
            const bodyObj = JSON.parse(body);
            const geoLoc = bodyObj.results[0].geometry.location;
            const geoLat = geoLoc.lat;
            const geoLng = geoLoc.lng;
            const location = `${geoLat},${geoLng}`;
            const tweetParams = {
                q: word,
                // tweets by users located within a given radius of the given latitude/longitude
                geocode: `${location},${radius}${unit}`,
                since: since,
                until: until,
                lang: language,
                // result_type: 'popular', // show only popular tweets
                count: count,
            }
    
            T.get('search/tweets', tweetParams)
            .then(response => {
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
    },
    findFriendTweet: (req, res) => {
        const keyword = req.query.keyword;
        let matchList = [];
        const tweetParams = {
            count: 200 // twitter's limit
        };

        // search for keyword in user's timeline
        T.get('statuses/home_timeline', tweetParams)
        .then(response => {
            
            for (let i = 1; i < response.data.length; i += 1) {
                // check if there's a match
                if (response.data[i].text.search(keyword) !== -1) {
                    // push data of the tweet contains the keyword to list
                    matchList.push(response.data[i]);
                }
            }
            return matchList;
        })
        .then(response => {
            // send to the client side
            res.json(response);
        })
    }
};

// get all data
// all users account's following <====
// show screen name
// show tweet

// count keyword in each tweet
// save to database?
// export to charts