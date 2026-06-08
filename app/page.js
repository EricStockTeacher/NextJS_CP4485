import Image from "next/image";

import {connectToDB} from '@/app/api/db'

export default function Home() {
  connectToDB()
  const first = "Eric";
  const last = "Stock";
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl font-bold">{first} {last}'s Rock Paper Scissors</h2>
      <p className="text-gray-500 text-lg">Click <span className="font-semibold text-blue-500">Play</span> in the navbar to get started!</p>
    </div>
  );
}
