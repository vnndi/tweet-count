const Nightmare = require('nightmare')
const assert = require('assert')
const expect = require('chai').expect

describe('Load a Page', function() {
  
    this.timeout(30000)

    describe('Home Page', () => {
        it('should search for the word puppy near NDI', done => {
            Nightmare({show: true})
            .goto('http://localhost:3000/')
            .wait('input')
            .type('input', 'puppy')
            .type('body', '\u0009')
            .type('body', '2018-03-25')
            .type('body', '\u0009')
            .type('body', '2018-03-30')
            .type('body', '\u0009')
            .type('body', '455 Massachusetts Ave NW')
            .type('body', '\u0009')
            .type('body', 'Washington')
            .type('body', '\u0009')
            .type('body', 'DC')
            .type('body', '\u0009')
            .type('body', 'US')
            .type('body', '\u0009')
            .type('body', '2')
            .type('body', '\u0009')
            .type('body', 'mi')
            .type('body', '\u0009')
            .type('body', 'en')
            .click('.btn-lg')
            .wait('.tweet-info')
            .wait(1000 * 3)
            .scrollTo(500, 0)
            .wait(1000 * 5)
            .end()
            .then(result => { done() })
            .catch(done)
        })
    })
})