import { getAccessToken } from '../../utils/oauth';

export default async function handler(req, res) {
    const { code } = req.query;

    try {
        // Retrieve the codeVerifier from the session or database
        const codeVerifier = req.session.codeVerifier;

        // Obtain the access token
        const accessToken = await getAccessToken(code, codeVerifier);

        // Save access token in session or database
        req.session.accessToken = accessToken;

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching access token', details: error.message });
    }
}
