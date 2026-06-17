"use client"
import {useRouter} from 'next/navigation'

export default function GenreSelect({selected}) {
    const router = useRouter();
    return (
        <select value={selected} onChange={(e) => {console.log(e); router.push(`?genre=${e.target.value}`)}}>
            <option value="">All</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="romance">Romance</option>
            <option value="kids">Kids</option>
        </select>
    )
}