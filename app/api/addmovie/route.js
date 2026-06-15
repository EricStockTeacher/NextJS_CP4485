
import {connectToDB} from '@/app/api/db';
import {revalidatePath} from 'next/cache'

export async function POST(request) {
    const {db} = await connectToDB();
    
    const formData = await request.formData();

    console.log(formData.get('title'));
    console.log(formData.get('year'));

    await db.collection('movies').insertOne( { title: formData.get("title"), year: formData.get("year")})

    revalidatePath('/movies');

    return Response.redirect(new URL('/movies', request.url), 303);
}