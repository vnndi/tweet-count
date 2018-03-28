const Twit = require('twit');
const config = require('./config'); // twitter keys stored in config.js
const T = new Twit(config);

const word = 'president';
const since = '2016-01-01'; // must be ISO format
const until = '2018-03-28';
const location = '38.8976755,-77.0365298';
const radius = '200';
const unit = 'mi'; // or km
const language = 'en';
const count = 5; // set number of results

const params = {
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

T.get('search/tweets', params, (err, data, response) => {
    // show all data
    console.log(data);

    console.log('\n==============================\n');
    console.log('show all users:\n');

    const dataInfo = data.statuses;

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
});

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