'use client';

import { specialties } from "@/db/seed/advocates"

export function Categories({ category, setCategory } : { category: string | null, setCategory: React.Dispatch<React.SetStateAction<string | null>> }) {
    const handleClick = ( specialty: string ) => {
        setCategory( category === specialty ? null : specialty )
    }
    return (
        <div className="flex flex-col">
            <p>Search By Category </p>
            <div className="flex gap-3 items-center overflow-x-auto max-w-full py-3">
                {
                    specialties.map( specialty => {
                        return <div key={specialty} onClick={() => handleClick( specialty )} className={`text-sm ${category === specialty ? `bg-cyan-600 text-white` : `bg-cyan-100 text-black`} rounded p-2 cursor-pointer text-nowrap`}>{specialty}</div>
                    })
                }
            </div>

        </div>
    )
}