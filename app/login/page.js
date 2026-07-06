
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose';
 

export default async function LoginPage() {
    async function login() {
        "use server"
        
        
        const secret = new TextEncoder().encode(
            'ericstock',
        )
        const alg = 'HS256'

        const jwt = await new SignJWT({ 'email': "eric.stock@cna.nl.ca" })
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)
        
        const cookieStore = await cookies();

        cookieStore.set('session', jwt, {  httpOnly: true })

        redirect('/movies')
    }

    return (
        <>
            <h2>Login</h2>
            <form action={login}>
                <button type="submit">Login</button>
            </form>
        </>
    )

}