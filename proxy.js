import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';
 

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = request.cookies.get('session')?.value;
    console.log(session)
    const secret = new TextEncoder().encode(
            'ericstock')

    try {
        await jwtVerify(session, secret)
    }
    catch {
        console.log("issue with jwt, redirecting to login")
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: '/movies/:path*',
}