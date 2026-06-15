import {connectToDB} from '@/app/api/db'
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache'

export default async function Page() {
    async function deleteMovie(formData) {
            "use server"
            const {db} = await connectToDB();
            await db.collection('movies').deleteOne( { _id: new ObjectId(formData.get("id"))}) 
            revalidatePath('/movies')
    }

    const {db} = await connectToDB();
    
    let movies = await db.collection('movies').find({}).toArray();
    console.log(movies);

    return (
        <>
            {movies.map( (movie) => {
                return <div key={movie._id}>
                        <h3>Name: {movie.title}</h3>
                        <p>Year: {movie.year}</p>
                        <form action={deleteMovie}>
                            <input type="hidden" name="id" value={movie._id.toString()}/>
                            <button type="submit">Delete</button>
                        </form>
                        <a href={`/movies/edit/${movie._id.toString()}`}>Edit</a>
                    </div>
            })
            }
        </>
    )
}