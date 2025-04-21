'use client';

import { Advocate } from "@/types/advocate";
import { useState } from "react";
import  { SearchInput } from "./SearchInput";
import  { SearchResults } from "./SearchResults";
import { debounce } from 'lodash'
import { CircularProgress } from "@mui/material";
import { Categories } from "../categories/Categories";

export const Search = () => {
    const [ filteredAdvocates, setFilteredAdvocates ] = useState<Advocate[] | null>(null)
    const [ category, setCategory ] = useState<string | null>( null )
    const [ loading, setLoading ] = useState<boolean>( false )

    const handleClear = () => {
        setFilteredAdvocates( null )
    }

    // debounce the search so a request is not shot off for every change when the user is still typing
    const debounceSearch = debounce( ( searchTerm ) => handleSearch( searchTerm ), 1000);

    const handleSearch = async ( searchTerm: string ) => {
        // do not send off search if search term cleared
        if ( !searchTerm ) return setFilteredAdvocates( [] )

        setLoading( true )

        const response = await fetch( '/api/advocates-search', {
            method: "POST",
            body: JSON.stringify({
                searchTerm,
                category
            })
        })

        const data = await response.json()

        setFilteredAdvocates( data.data ?? [] )

        setLoading( false )
    }

    return (
        <div className="flex flex-col gap-3">
            <SearchInput handleSearch={debounceSearch} handleClear={handleClear} />
            <Categories category={category} setCategory={setCategory} />
            {
                loading ? (
                    <div className="flex flex-col gap-1">
                        <p>Please hold tight...</p>
                        <CircularProgress />
                    </div>
                ) : <SearchResults filteredAdvocates={filteredAdvocates} />
            }
            
        </div>
    )
}