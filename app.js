const Twit = require('twit');
const config = require('./config'); // twitter keys stored in config.js
const T = new Twit(config);

const word = 'football';
const time = '2017-01-01';
const city = ['-122.75', '36.8', '-121.75', '37.8']; // san francisco
let data = {};

// T.get('search/tweets', {q: `${word} since:${time}`, count: 100}, (err, data, response) => {
//     // show all data
//     console.log(data);
// });

// // get list of user's friends
// T.get('friends/list', { screen_name: 'klonojulio' }, (err, data, response) => {
//     console.log(data);
// })

// stream tweets contains specific word
const stream = T.stream('statuses/filter', {locations: city});
 
stream.on('tweet', (tweet) => {
    // console.log(tweet)

    data = tweet;

    console.log(data);
})

// get all data
// all users account's following <====
// show screen name
// show tweet

// count keyword in each tweet
// save to database?
// export to charts