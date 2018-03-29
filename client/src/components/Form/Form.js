import React from 'react';
import './Form.css';

const Form = ({keyword, fromDate, toDate, address, city, state, country, radius, handleInputChange, handleClick}) => (
    <form>
        <div className="form-group">
            <label htmlFor="text">Keyword</label>
            <input type="text" className="form-control" placeholder="Enter keyword" name="keyword" value={keyword} onChange={handleInputChange}/>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputFromDate">From Date</label>
                <input type="text" className="form-control" id="inputFromDate" placeholder="2017-01-01" name="fromDate" value={fromDate} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputToDate">To Date</label>
                <input type="text" className="form-control" id="inputFromDate" placeholder="2018-01-01" name="toDate" value={toDate} onChange={handleInputChange}/>
            </div>
        </div>
        <div className="form-group friends-page">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="address" value={address} onChange={handleInputChange}/>
        </div>
        <div className="form-row friends-page">
            <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" name="city" value={city} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="inputState">State / Province</label>
                <input type="text" className="form-control" id="inputState" name="state" value={state} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputCountry">Country</label>
                <input type="text" className="form-control" id="inputCountry" name="country" value={country} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="inputRadius">Radius</label>
                <input type="text" className="form-control" id="inputRadius" name="radius" value={radius} onChange={handleInputChange}/>
            </div>
            <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                <label className="form-check-label" htmlFor="exampleRadios1">
                    Mile(s)
                </label>
            </div>
            <div className="form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                <label className="form-check-label" htmlFor="exampleRadios2">
                    Kilometer(s)
                </label>
            </div>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Get Tweets</button>
    </form>
)

export default Form;