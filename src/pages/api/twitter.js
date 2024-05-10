import { fetchTweets } from '../../utils/twitterApi';

export default async function handler(req, res) {
    const { query, startTime, endTime } = req.query;
    try {
        const tweets = await fetchTweets(query, startTime, endTime);
        res.status(200).json(tweets);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Error fetching tweets',
            details: error.response?.data || error.message,
            hint: 'Ensure your Twitter API credentials have the required access level and are attached to a project.'
        });
    }
}
