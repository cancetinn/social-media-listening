import axios from 'axios';

const twitterApi = axios.create({
    baseURL: 'https://api.twitter.com/2',
    headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
});

export const fetchTweets = async (query, startTime, endTime) => {
    try {
        const response = await twitterApi.get('/tweets/search/recent', {
            params: {
                query,
                start_time: startTime,
                end_time: endTime,
                max_results: 10,
                tweet_fields: 'created_at,public_metrics'
            }
        });
        console.log(response.data); // Debugging line
        return response.data.data;
    } catch (error) {
        console.error('Error fetching tweets:', error.response?.data || error.message);
        throw error;
    }
};


