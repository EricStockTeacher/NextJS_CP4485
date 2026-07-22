"use client"

import {useState} from 'react';

export default function RecommendButton() {
    const [recomendations, setRecomendations] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        //console.log("getting movies!!!")
        setRecomendations(null);

        const response = await fetch('/api/recommend', {
            method: "POST"
        });
        const data = await response.json();
        //console.log(data.recomendations);

        setRecomendations(data.recomendations);
        setLoading(false);
    }

    return (
        <>
            <button onClick={handleClick} disabled={loading} >Get Recomendations</button>
            {loading && <p>Loading...</p>}
            {

                recomendations && recomendations.map(( rec, i) => (
                    <div key={i}>
                        <h3>{rec.title}</h3>
                        <p>{rec.reason}</p>
                    </div>
                ))
            }
        </>
    )

}