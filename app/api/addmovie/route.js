
import {connectToDB} from '@/app/api/db';
import {revalidatePath} from 'next/cache'
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'

export async function POST(request) {

    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    console.log(process.env.JWT_SECRET);
    console.log(session)
    const secret = new TextEncoder().encode(
            process.env.JWT_SECRET)
    let payload = null;
    try {
        ({payload} = await jwtVerify(session.value, secret))
    }
    catch {
        console.log("issue with jwt, redirecting to login")
        return Response.json({error: 'Unauthorized'}, {status: 401})
    }



    const {db} = await connectToDB();
    
    const formData = await request.formData();

    console.log(formData.get('title'));
    console.log(formData.get('year'));

    await db.collection('movies').insertOne( { 
        title: formData.get("title"), 
        year: formData.get("year"),
        genre: formData.get("genre"),
        directorId: new ObjectId(formData.get("directorId")),
        userId: new ObjectId(payload.userId)
    })

    revalidatePath('/movies');

    return Response.redirect(new URL('/movies', request.url), 303);
}