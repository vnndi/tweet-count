const Nightmare = require('nightmare')
const expect = require('chai').expect

describe('Tweet Count - Friends\' tweets', function() {

    this.timeout(50000);

    it('should search for the word "real" from friends\' tweets', done => {
        Nightmare({show: true})
        .goto('http://localhost:3000/')
        .wait('.nav-icon')
        .click('.nav-icon')
        .wait(1000 * 2)
        .evaluate(()=>{
            const elements = Array.from(document.querySelectorAll('.nav-link'))

            elements[0].click();
        })
        .wait('input')
        .type('input', 'real')
        .click('.btn-lg')
        .wait('.tweet-info')
        .wait(1000 * 2)
        .scrollTo(500, 0)
        .wait(1000 * 2)
        .wait(1000 * 5)
        .end()
        .then(result => { done() })
        .catch(done)
    })
})