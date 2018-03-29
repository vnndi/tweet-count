import React from 'react';
import './Form.css';

const Form = ({keyword, fromDate, toDate, address, city, state, country, radius, unit, language, handleInputChange, handleClick}) => (
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
            <input type="text" className="form-control" id="inputAddress" placeholder="455 Massachusetts Ave NW" name="address" value={address} onChange={handleInputChange}/>
        </div>
        <div className="form-row friends-page">
            <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" placeholder="Washington" name="city" value={city} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="inputState">State / Province</label>
                <input type="text" className="form-control" id="inputState" placeholder="DC" name="state" value={state} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputCountry">Country</label>
                <input type="text" className="form-control" id="inputCountry" placeholder="US" name="country" value={country} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputRadius">Radius</label>
                <input type="text" className="form-control" id="inputRadius" placeholder="2" name="radius" value={radius} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputRadius">Unit</label>
                <input type="text" className="form-control" id="inputUnit" placeholder="mi" name="unit" value={unit} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-2">
                <label htmlFor="inputRadius">Language</label>
                <input type="text" className="form-control" id="inputLanguage" placeholder="en" name="language" value={language} onChange={handleInputChange}/>
            </div>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Get Tweets</button>
    </form>
)

export default Form;