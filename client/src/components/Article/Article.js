import React from 'react';
import formatDate from '../../utils/formatDate';
import {ListItem} from '../List';
import './Article.css';

const Article = ({title, userID, userName, retweetCount, url, id, date, handleClick, buttonText, saved}) => (
    <ListItem>
        <div>
            <p><b>{title}</b></p>
            <div className="tweet-info">
                <p><a href={`https://twitter.com/${userName}`} rel="noopener noreferrer" target="_blank">@{userName}</a> (id: {userID})</p>
                <p>Retweet Count: {retweetCount}</p>
                <p>Date {saved ? "Saved" : "Published"}: {formatDate(date)}</p>
            </div>
            
            <span className="btn-group float-right">
                <a className="btn btn-outline-primary" href={`https://twitter.com/statuses/${id}`} rel="noopener noreferrer" target="_blank">
                    View Tweet
                </a>
                <button onClick={() => handleClick(id)} className="btn btn-primary">
                    {buttonText}
                </button>
            </span>
        </div>
    </ListItem>
)

export default Article;