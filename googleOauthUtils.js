import {google} from 'googleapis';
import {connectToDB} from './app/api/db';

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT
)

export const getGoogleOauthUrl = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]

    return oauthClient.generateAuthUrl( {
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    })
}

export const getGoogleUser = async (code) => {
    const {tokens} = await oauthClient.getToken(code);
    console.log(tokens);
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`)
    const userInfo = await response.json();
    
    return userInfo;
}

export const updateOrCreateUserInfo = async(oauthUserInfo) => {
    const {db} = await connectToDB();

    const {
        id,
        email,
        name
    } = oauthUserInfo;

    let user = await db.collection('users').findOne({email});
    if( !user ) {
        const result = await db.collection('users').insertOne({email, id, name});
        user = {
            _id: result.insertedId, email, id, name
        }
    }
    return user;
}