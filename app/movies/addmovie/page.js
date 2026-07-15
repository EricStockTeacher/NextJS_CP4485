import AddMovieForm from '../../components/AddMovieForm';

import {movies} from '@/lib/movies'
import {connectToDB} from '@/app/api/db'

export default async function Page() {

    const {db} = await connectToDB();

    const directors = await db.collection('directors').find({}).toArray();

    const serializedDirectors = directors.map( d => ( {_id: d._id.toString(), name: d.name }))

    return (
        <main className="mx-auto mt-10 w-full max-w-md px-4">
            <AddMovieForm directors={serializedDirectors}></AddMovieForm>
        </main>
    )
}