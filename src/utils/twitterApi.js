import axios from 'axios';

// Tweetleri Alma
export const fetchTweets = async (accessToken, query, startTime, endTime) => {
    try {
        const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
            params: {
                query,
                start_time: startTime,
                end_time: endTime,
                max_results: 10,
                tweet_fields: 'created_at,public_metrics'
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching tweets:', error.response?.data || error.message);
        throw error;
    }
};
