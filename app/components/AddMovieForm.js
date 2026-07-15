export default function AddMovieForm({ action, directors}) {
     
    return (
        <form action={action} method="POST" className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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

                <div className="space-y-2">
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                    <select name="genre" id="genre">
                        <option value="kids">Kids</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="romance">Romance</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="directorId" className="block text-sm font-medium text-gray-700">Director</label>
                    <select name="directorId" id="directorId">
                        {
                            directors.map( (director) => (
                                <option value={director._id.toString()}>
                                    {director.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Submit
                </button>
            </form>
    )
}