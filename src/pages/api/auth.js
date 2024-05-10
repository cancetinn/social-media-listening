import { generateOAuthParams, getAuthorizationUrl } from '../../utils/twitterApi';

export default async function handler(req, res) {
    const { codeVerifier, codeChallenge } = generateOAuthParams();

    // Session veya veritabanına codeVerifier kaydetme
    req.session.codeVerifier = codeVerifier;

    const authorizationUrl = getAuthorizationUrl(codeChallenge);
    res.redirect(authorizationUrl);
}
