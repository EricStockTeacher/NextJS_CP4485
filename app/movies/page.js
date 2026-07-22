import {connectToDB} from '@/app/api/db'
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache'
import GenreSelect from '@/app/components/GenreSelect.js'

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import  RecommendButton  from '@/app/components/RecommendButton.js'

export default async function Page({searchParams}) {
    async function deleteMovie(formData) {
            "use server"
            const {db} = await connectToDB();
            await db.collection('movies').deleteOne( { _id: new ObjectId(formData.get("id"))}) 
            revalidatePath('/movies')
    }

    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    const secret = new TextEncoder().encode(
            process.env.JWT_SECRET)
    
    const {payload} = await jwtVerify(session.value, secret)
    
    const {db} = await connectToDB();
    const genre = (await searchParams)?.genre;

    const filter = genre ? {"userId": new ObjectId(payload.userId), "genre":genre} :  {"userId": new ObjectId(payload.userId)}

    //let movies = await db.collection('movies').find(filter).toArray();
   console.log(genre);
    let movies = await db.collection('movies').aggregate(
         [{
            $match: filter
        },
        {
            $lookup: {
                from: "directors",
                localField: "directorId",
                foreignField: "_id",
                as: "directorInfo"
            }
        },
        {
            $unwind: 
            {
                path: "$directorInfo",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).toArray();


    return (
        <>
            <GenreSelect selected={genre}></GenreSelect>
            {movies.map( (movie) => {
                return <div key={movie._id}>
                        <h3>Name: {movie.title}</h3>
                        <p>Year: {movie.year}</p>
                        <p>Rating: {movie.rating}</p>
                        <p>Director: {movie.directorInfo.name}</p>
                        <p>Director Rating: {movie.directorInfo.rating}</p>
                        <form action={deleteMovie}>
                            <input type="hidden" name="id" value={movie._id.toString()}/>
                            <button type="submit">Delete</button>
                        </form>
                        <a href={`/movies/edit/${movie._id.toString()}`}>Edit</a>
                    </div>
            })

            }
            <RecommendButton></RecommendButton>
        </>
    )
}