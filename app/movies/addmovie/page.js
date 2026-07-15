import AddMovieForm from '../../components/AddMovieForm';

import {connectToDB} from '@/app/api/db'
import { redirect } from 'next/navigation'
import {revalidatePath } from 'next/cache'
import { ObjectId } from 'mongodb';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'


export default async function Page() {

    async function addMovie(formData) {
        "use server"

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
            console.log("issue with jwt server action, redirecting to login")
            redirect('/login')
        }

        const {db} = await connectToDB();
          
        await db.collection('movies').insertOne( { 
            title: formData.get("title"), 
            year: formData.get("year"),
            genre: formData.get("genre"),
            directorId: new ObjectId(formData.get("directorId")),
            userId: new ObjectId(payload.userId)
        })

        revalidatePath('/movies')
        redirect('/movies')
    }

    const {db} = await connectToDB();

    const directors = await db.collection('directors').find({}).toArray();

    const serializedDirectors = directors.map( d => ( {_id: d._id.toString(), name: d.name }))

    return (
        <main className="mx-auto mt-10 w-full max-w-md px-4">
            <AddMovieForm action={addMovie} directors={serializedDirectors}></AddMovieForm>
        </main>
    )
}