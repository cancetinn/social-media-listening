import React from 'react';

const TweetCard = ({ tweet }) => {
    const { text, created_at, public_metrics } = tweet;
    return (
        <div className="tweet-card">
            <p>{text}</p>
            <p>{new Date(created_at).toLocaleString()}</p>
            <p>Likes: {public_metrics.like_count}</p>
            <p>Retweets: {public_metrics.retweet_count}</p>
            <a href={`https://twitter.com/user/status/${tweet.id}`} target="_blank" rel="noopener noreferrer">
                View on Twitter
            </a>
        </div>
    );
};

export default TweetCard;
