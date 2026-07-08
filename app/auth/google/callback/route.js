
import { getGoogleUser } from "@/googleOauthUtils";

export async function GET(params) {
    let request = await params;
    const {searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    console.log(code);

    const oauthUserInfo = await getGoogleUser(code);
    console.log(oauthUserInfo);

    const createdUser = {}

    //create jwt

    //add jwt to cookies

    //redirect to /movies




}