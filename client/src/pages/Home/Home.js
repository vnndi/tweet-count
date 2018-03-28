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

    formCheck = event => {
        event.preventDefault();

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

        API.getTweets(details)
        .then(res => {
            this.setState({
                articles: res.data,
                message: !res.data.length
                ? "No new Tweets found, please try again."
                : ""
            })
        })
        .catch(err => console.log(err));
    }

    getArticles = () => {
        API.getArticles()
        .then(res => {
            this.setState({
                articles: res.data,
                message: !res.data.length
                ? "No new Tweets found, please try again."
                : ""
            })
        })
        .catch(err => console.log(err));
    };

    handleArticleSave = id => {
        const article = this.state.articles.find(article => article.url.slice(-10).slice(0, 6) === id);
        API.saveArticle(article).then(res => this.getArticles());
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
                    
                    <div className="text-center">
                        <button className="btn btn-primary btn-lg" onClick={() => this.getArticles()}>Get Tweets</button>
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
                        <Card title="Results">
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