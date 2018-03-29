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
        radius: ''
    };

    handleInputChange = event => {
        // Get the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    appendToStorage = (name, data) => {
        var old = localStorage.getItem(name);

        // check if keyword exists
        if(old === null) old = "";

        // set the matching keyword with the number of hit
        localStorage.setItem(name, data);
    }

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
            radius: this.state.radius
        }

        console.log(details);

        // send API request with details object to server
        API.getTweets(details)
        .then(res => {
            console.log('number of hits: ' + res.data.length);

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

                this.appendToStorage(word, hit)
            }
        })
        .catch(err => console.log(err));
    };

    showReport = () => {
        let results = {};

        for(let i = 0; i < localStorage.length; i += 1) {
            console.log(localStorage.key(i) + ': ' + localStorage.getItem(localStorage.key(i)));

            // append to result object
            results[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
        }

        console.log(results);
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">
                        <strong>Tweet Count</strong>
                    </h1>
                    <h2 className="text-center">
                        Search &amp; save the tweets of your interest.
                    </h2>
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
                            showReport={this.showReport}
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