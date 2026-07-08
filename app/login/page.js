
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose';

import { connectToDB } from '../api/db';
import { getGoogleOauthUrl } from '@/googleOauthUtils';
 

export default async function LoginPage() {
    async function login(formData) {
        "use server"

        const redirectURL = getGoogleOauthUrl();
        //console.log(redirectURL);
        redirect(redirectURL);

        
        /*const username = formData.get('username');

        const {db} = await connectToDB();

        let user = await db.collection('users').findOne({username})

        if( !user ) {
            const result = await db.collection('users').insertOne({username})
            user = await db.collection('users').findOne({username})
        }


        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET,
        )
        const alg = 'HS256'

        const jwt = await new SignJWT({ 'userId' : user._id.toString() })
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)
        
        const cookieStore = await cookies();

        cookieStore.set('session', jwt, {  httpOnly: true })

        redirect('/movies')*/
    }

    return (
        <>
            <h2>Login</h2>
            <form action={login}>
                <button type="submit">Login with Google</button>
            </form>
        </>
    )

}