import axios from 'axios';
import qs from 'qs';
import base64 from 'base-64';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const encodedCredentials = base64.encode(`${clientId}:${clientSecret}`);

const getAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://api.twitter.com/oauth2/token',
            qs.stringify({ grant_type: 'client_credentials' }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${encodedCredentials}`
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchTweets = async (query, startTime, endTime) => {
    const accessToken = await getAccessToken();
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
