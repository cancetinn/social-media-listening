import { generateOAuthParams, getAuthorizationUrl } from '@/utils/oauth';
import { withSessionRoute } from 'next-session'; // next-session kullanıyorsanız

export default withSessionRoute(async function handler(req, res) {
    const { codeVerifier, codeChallenge } = generateOAuthParams();

    // Session veya veritabanına codeVerifier kaydetme
    req.session.set('codeVerifier', codeVerifier);
    await req.session.save();

    const authorizationUrl = getAuthorizationUrl(codeChallenge);
    res.redirect(authorizationUrl);
});
