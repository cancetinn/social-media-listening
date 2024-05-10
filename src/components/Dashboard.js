import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import TweetCard from './TweetCard';
import FilterPanel from './FilterPanel';

const Dashboard = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTweets = async (query, startTime, endTime) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/twitter', {
                params: { query, startTime, endTime }
            });
            setTweets(response.data);
            setError(null);
        } catch (error) {
            setError('Failed to fetch tweets');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Social Media Listening Dashboard</h1>
            <FilterPanel onSearch={fetchTweets} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                {tweets.map(tweet => (
                    <TweetCard key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
