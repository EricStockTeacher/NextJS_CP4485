import {connectToDB} from '@/app/api/db'
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function Page({params}) {
    let {id} = await params;

    async function updateData(formData) {
        "use server"
        const {db} = await connectToDB();
        await db.collection('movies').updateOne( { _id: new ObjectId(id)},
                                                  {  $set: { title: formData.get("title"), "year": formData.get("year")}}) 
        revalidatePath('/movies')

        redirect('/movies')
    }


    const {db} = await connectToDB();
    
    let movie = await db.collection('movies').findOne({_id: new ObjectId(id)})
    console.log(movie);


    return (
        <form action={updateData}>
            <input type="text" defaultValue={movie.title} name="title"/>
            <input type="text" defaultValue={movie.year} name="year"/>
            <button type="submit">Update</button>
        </form>
    )
}