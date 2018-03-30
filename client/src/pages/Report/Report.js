import React, {Component} from 'react';
import Jumbotron from '../../components/Jumbotron';
import Card from '../../components/Card';
import ReportCard from '../../components/ReportCard';
import Footer from '../../components/Footer';
// import API from '../../utils/API';
import {Col, Row, Container} from '../../components/Grid';
import {Table} from '../../components/Table';

class Report extends Component {
    constructor() {
        super();
        // convert string results to json object
        let tmp = JSON.parse(localStorage.getItem('results'));
        // convert object to array in order to use map() later
        let results = Object.keys(tmp).map(key => {
            return [key, tmp[key]];
        });
        // NOTE: it's a lot easier to do it this way than saving results as an array because:
        // when saving an object containing a pair of name and value: looping through an array of objects and checking each object's name to avoid duplicate is more complicated than saving an object to an object 

        this.state = {
            results
        };
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center">
                        <h1 className="display-3">Report</h1>
                        <p className="lead">Results of your previous searches.</p>
                    </div>
                </Jumbotron>
                <Container>
                    <Row>
                    <Col size="md-12">
                        <Card 
                            title="Report"
                        >
                            {
                                this.state.results 
                                ? (
                                    <Table>
                                        {this.state.results.map(result => (
                                            <ReportCard
                                                key={result[0]}
                                                id={result[0]}
                                                word={result[0]}
                                                hit={result[1]}
                                            />
                                        ))}
                                    </Table>
                                ) 
                                : (
                                    <h3 className="text-center">{this.state.message}</h3>
                                )
                            }
                        </Card>
                    </Col>
                    </Row>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default Report;