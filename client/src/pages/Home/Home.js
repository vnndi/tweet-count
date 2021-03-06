import React, {Component} from 'react';
import Jumbotron from '../../components/Jumbotron';
import Form from '../../components/Form';
import Card from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

class Home extends Component {
    state = {
        articles: [],
        message: "Click Get Tweets",
        totalHit: '',
        keyword: '',
        fromDate: '',
        toDate: '',
        address: '',
        city: '',
        state: '',
        country: '',
        radius: '',
        unit: '',
        language: ''
    };

    handleInputChange = event => {
        // Get the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    // append new data as string to a specific key in localstorage
    appendToResult = (name, data) => {
        // set results as an object to avoid duplicates entries
        let results = JSON.parse(localStorage.getItem('results')) || {};
        // NOTE: if saving results as an array, need fuction to check for existing pair of name and value -> more work than it's worth

        // add to results object with name and data
        results[name] = data;
        localStorage.setItem('results', JSON.stringify(results));
    };

    // handle form submit
    formCheck = event => {
        event.preventDefault();

        // clear total hit
        this.setState({
            totalHit: ''
        });

        // setup details object
        const details = {
            keyword: this.state.keyword,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            radius: this.state.radius,
            unit: this.state.unit,
            language: this.state.language
        }

        // check if there's an address to prevent Google Maps reject empty request
        if (details.address === '') {
            this.setState({
                message: 'Please enter a valid address'
            })
        }
        else {
            // send API request with details object to server
            API.getTweets(details)
            .then(res => {
                // update state with response from server
                this.setState({
                    articles: res.data,
                    totalHit: res.data.length,
                    // handle notification if no result found
                    message: !res.data.length
                    ? "No new Tweets found, please try again."
                    : ""
                });

                // check if there's result
                if (res.data.length !== 0) {
                    const word = this.state.keyword;
                    const hit = this.state.totalHit;

                    this.appendToResult(word, hit);
                }
            })
            .catch(err => console.log(err));
        } 
    };

    // append new pair of key and value to localstorage <== MIGHT NOT NEED
    appendToStorage = (name, data) => {
        var old = localStorage.getItem(name);

        // check if keyword exists
        if(old === null) old = "";

        // set the matching keyword with the number of hit
        localStorage.setItem(name, data);
    };

    // show report in the console, maynot need if having a specific report page <== MIGHT NOT NEED
    showReport = () => {
        let results = {};

        for(let i = 0; i < localStorage.length; i += 1) {
            // append to result object
            results[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
        }
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center">
                        <h1 className="display-3">Tweet Count</h1>
                        <p className="lead">Search &amp; save the tweets of your interest.</p>
                    </div>
                </Jumbotron>
                <Container>
                    <Form
                        keyword={this.state.keyword}
                        fromDate={this.state.fromDate}
                        toDate={this.state.toDate}
                        address={this.state.address}
                        city={this.state.city}
                        state={this.state.state}
                        country={this.state.country}
                        radius={this.state.radius}
                        handleInputChange={this.handleInputChange}
                        handleClick={this.formCheck}
                    />
                    <Row>
                        <Col size="md-12">
                            <Card 
                                title="Results" 
                                totalHit={this.state.totalHit}
                                // showReport={this.showReport} // use if show report button on result card
                            >
                                {this.state.articles.length ? (
                                    <List>
                                        {this.state.articles.map(article => (
                                            <Article
                                                key={article.id_str}
                                                id={article.id_str}
                                                title={article.text}
                                                userID={article.user.id_str}
                                                userName={article.user.screen_name}
                                                retweetCount={article.retweet_count}
                                                url={article.source}
                                                date={article.created_at}
                                                handleClick={this.handleArticleSave}
                                                buttonText="Save Tweet"
                                            />
                                        ))}
                                    </List>
                                ) : (
                                    <h3 className="text-center">{this.state.message}</h3>
                                )}
                            </Card>
                        </Col>
                    </Row>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Home;