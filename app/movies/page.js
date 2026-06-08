
import { movies} from '@/lib/movies'

export default function Page() {
    return (
        <>
            {movies.map( (movie) => {
                return <div key={movie.id}>
                        <h3>Name: {movie.title}</h3>
                        <p>Year: {movie.year}</p>
                    </div>
            })
            }
        </>
    )
}