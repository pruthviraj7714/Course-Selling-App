"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Appbar() {
  const session = useSession(); 

    return <div className='bg-gradient-to-l from-slate-900 to-slate-950 flex justify-between items-center p-4 border-b-2 border-black'>
    <div className="text-white">
        Logo
    </div>
    {session.data?.user ? (
     <>
      <div className="text-white">
          Searchbar
        </div>
        <button className="px-4 py-1 rounded bg-white font-semibold" onClick={() => signOut()}>
          Logout
        </button>
     </>

    ) : (
      <button className="px-4 py-1 rounded bg-white font-semibold" onClick={() => signIn()}>
          Sign In
      </button>
    )}
    <div className="text-white"> 
      Hello
    </div>
  </div>
}