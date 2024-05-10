import axios from 'axios';
import crypto from 'crypto';

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
const redirectUri = process.env.TWITTER_REDIRECT_URI; // .env.local dosyasına ekleyin
// Base64 URL Encode
function base64URLEncode(str) {
    return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// SHA256 Hashleme
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

// OAuth Parametrelerini Oluşturma
export const generateOAuthParams = () => {
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    const codeChallenge = base64URLEncode(sha256(codeVerifier));

    return { codeVerifier, codeChallenge };
};

// Yetkilendirme URL'si Alma
export const getAuthorizationUrl = (codeChallenge) => {
    const scope = 'tweet.read users.read';
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=${scope}`;
};

// Access Token Alma
export const getAccessToken = async (code, codeVerifier) => {
    try {
        const response = await axios.post(
            'https://api.twitter.com/2/oauth2/token',
            new URLSearchParams({
                client_id: clientId,
                code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
                code_verifier: codeVerifier
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        throw error;
    }
};

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
