import axios from 'axios';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;

const getAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://api.twitter.com/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
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
        const response = await axios.get('https://api.twitter.com/1.1/search/tweets.json', {
            params: {
                q: query,
                count: 10,
                since: startTime,
                until: endTime
            },
            headers: {
                'Authorization': `OAuth ${accessToken}`
            }
        });
        return response.data.statuses;
    } catch (error) {
        console.error('Error fetching tweets:', error.response?.data || error.message);
        throw error;
    }
};
