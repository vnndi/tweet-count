import React, {Component} from 'react';
import Jumbotron from '../../components/Jumbotron';
import Form from '../../components/Form';
import Card from '../../components/Card';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {List} from '../../components/List';

class Friends extends Component {
    state = {
        articles: [],
        message: "Click Get Tweets",
        totalHit: '',
        keyword: ''
    };

    handleInputChange = event => {
        // Get the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    getFriendTweet = event => {
        event.preventDefault();

        // clear total hit
        this.setState({
            totalHit: ''
        });

        // setup details object
        const details = {
            keyword: this.state.keyword,
        }

        // send API request with details object to server
        API.getFriendTweets(details)
        .then(res => {
            this.setState({
                articles: res.data,
                totalHit: res.data.length,
                // handle notification if no result found
                message: !res.data.length
                ? "No new Tweets found, please try again."
                : ""
            });
        })
        .catch(err => console.log(err));
    };

    showReport = () => {
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center">
                        <h1 className="display-3">Friends' Tweet Count</h1>
                        <p className="lead">Get the latest tweets from people you follow.</p>
                    </div>
                </Jumbotron>
                <Container>
                    <Form
                        keyword={this.state.keyword}
                        handleInputChange={this.handleInputChange}
                        handleClick={this.getFriendTweet}
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

export default Friends;