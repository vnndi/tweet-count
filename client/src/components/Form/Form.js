import React, {Component} from 'react';
import './Form.css';

class Form extends Component {
    state = {
        // hide input fields not needed on friends page
        friendsPage: false
    };

    componentWillMount() {
        // check if current page is friends page
        if (window.location.href.includes('friends')) {
            this.setState({
                friendsPage: true
            })
        }
    };

    render() {
        return (
            // render form with condition
            this.state.friendsPage
            // only show keyword input field if on friends page
            ? (
                <form>
                    <div className="form-group">
                        <label htmlFor="text">Keyword</label>
                        <input type="text" className="form-control" placeholder="Enter keyword" name="keyword" value={this.props.keyword} onChange={this.props.handleInputChange}/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-lg btn-primary" onClick={this.props.handleClick}>Get Tweets</button>
                    </div>
                </form>
            )
            // show full input fields if not on friends page
            : (
                <form>
                    <div className="form-group">
                        <label htmlFor="text">Keyword</label>
                        <input type="text" className="form-control" placeholder="Enter keyword" name="keyword" value={this.props.keyword} onChange={this.props.handleInputChange}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFromDate">From Date</label>
                            <input type="text" className="form-control" id="inputFromDate" placeholder="2017-01-01" name="fromDate" value={this.props.fromDate} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputToDate">To Date</label>
                            <input type="text" className="form-control" id="inputFromDate" placeholder="2018-01-01" name="toDate" value={this.props.toDate} onChange={this.props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group friends-page">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="455 Massachusetts Ave NW" name="address" value={this.props.address} onChange={this.props.handleInputChange}/>
                    </div>
                    <div className="form-row friends-page">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity" placeholder="Washington" name="city" value={this.props.city} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">State / Province</label>
                            <input type="text" className="form-control" id="inputState" placeholder="DC" name="state" value={this.props.state} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputCountry">Country</label>
                            <input type="text" className="form-control" id="inputCountry" placeholder="US" name="country" value={this.props.country} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRadius">Radius</label>
                            <input type="text" className="form-control" id="inputRadius" placeholder="2" name="radius" value={this.props.radius} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRadius">Unit</label>
                            <input type="text" className="form-control" id="inputUnit" placeholder="mi" name="unit" value={this.props.unit} onChange={this.props.handleInputChange}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputRadius">Language</label>
                            <input type="text" className="form-control" id="inputLanguage" placeholder="en" name="language" value={this.props.language} onChange={this.props.handleInputChange}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-lg btn-primary" onClick={this.props.handleClick}>Get Tweets</button>
                    </div>
                </form>
            )
        )
    }
}

export default Form;