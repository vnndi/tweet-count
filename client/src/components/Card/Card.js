import React from 'react';
import './Card.css';

const Card = props => (
    <div className="card border-primary mb-3">
        <div className="card-header text-white bg-primary border-primary">
            <i className="fas fa-list-alt"></i>
            <span className="card-title ml-2">{props.title}: {props.totalHit}</span>
            <button type="button" className="btn btn-success float-right" onClick={props.showReport}>Show Report</button>
        </div>
        <div className="card-body">
            <div className="panel-body">{props.children}</div>
        </div>
    </div>
)

export default Card;