"use client"

import {useState} from 'react';

export default function RecommendButton() {
    const [recommendations, setRecommendations] = useState(null);

    const handleClick = async () => {
        console.log("getting movies!!!")
        setRecommendations(null);

        const response = await fetch('/api/recommend', {
            method: "POST"
        });
        const data = await response.json();
        console.log(data.recommendations);

        setRecommendations(data.recommendations);
    }

    return (
        <>
            <button onClick={handleClick}>Get Recommendations</button>
            {
                recommendations && recommendations.map(( rec, i) => {
                    <div key={i}>
                        <h3>{rec.title}</h3>
                        <p>{rec.reason}</p>
                    </div>
                })
            }
        </>
    )

}