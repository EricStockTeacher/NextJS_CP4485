import {connectToDB} from '@/app/api/db';
import { ObjectId } from 'mongodb';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'


export async function POST(request) {
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
        console.log("issue with jwt api, redirecting to login")
        return Response.json({error: 'Unauthorized'}, {status: 401})
    }

    const {db} = await connectToDB();

    const userId = payload.userId;

    const movieList = await db.collection('movies').find( {userId: new ObjectId(userId)}).toArray();
    //console.log(movieList);

    const cleanedMovies = movieList.map( (movie) => ({"title": movie.title, "rating": movie.rating}));

    //console.log(cleanedMovies);

    //return Response.json({"status": "testing"})





    const GITHUB_MODELS_URL = "https://models.github.ai/inference/chat/completions"
    const MODEL = "openai/gpt-4.1-mini"
    const token = process.env.GITHUB_MODEL_TOKEN;
    const SYSTEM_PROMPT = `
        System Prompt:

        You are a movie recommendation assistant.

        Based on the user's movie collection and their rating for each movie, recommend five movies they have
        not already watched.  A rating of 1 or 2 is a movie the user didn't like.  
        A rating of 3 shows the user found the movie mediocre and a rating of 4 or 5 means the user loved the move

        Return one valid JSON object using exactly this structure:

        {
        "recommendations": [
            {
            "title": "Movie title",
            "year": 2020,
            "reason": "Brief explanation of why it is recommended",
            "basedOn": ["Previously watched movie"]
            }
        ]
        }
    `

    try {
        //const requestBody = await request.json();
        //const movies = requestBody.movies;

        //console.log(movies);

        const aiResponse = await fetch(GITHUB_MODELS_URL, {
            method: "POST",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "X-GitHub-Api-Version":"2026-03-10",
            },
            body: JSON.stringify( {
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: "user",
                        content: JSON.stringify(cleanedMovies)
                    }
                ],
                max_tokens: 1000,
                response_format: {
                    type: "json_object",
                }
            })
        })

        const aiResponseBody = await aiResponse.json();

        const content = aiResponseBody.choices?.[0]?.message?.content;

        const result = JSON.parse(content);

        return Response.json({"recomendations": result.recommendations})
    }
    catch(error) {
        return Response.json(
            {error:"Unable to generate movie recommendations", error},
            {status: 500}
        );
    }
}