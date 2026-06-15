import {movies} from '@/lib/movies'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {connectToDB} from '@/app/api/db'


export default function Page() {
    /*async function submitForm(formData) {
        "use server"
        
        const {db} = await connectToDB();
        await db.collection('movies').insertOne( { title: formData.get("title"), year: formData.get("year")})
        
        //movies.push( {id: (maxId+1), title: formFields.title, year: formFields.year} )
        //movies.push( {title: formFields.title, year: formFields.year} )

        revalidatePath('/movies')

        redirect('/movies');
    }*/
    return (
        <main className="mx-auto mt-10 w-full max-w-md px-4">
            <form action={'/api/addmovie'} method="POST" className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-900">Add Movie</h1>

                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        name="title"
                        id="title"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                        name="year"
                        id="year"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Submit
                </button>
            </form>
        </main>
    )
}