'use client';

import { TextField } from "@mui/material";
import { ReactNode, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchLabel : ReactNode = <div className="flex gap-0.5"><p>Search</p><SearchIcon /></div>

export const SearchInput = ({ handleSearch, handleClear } : { handleSearch: ( searchTerm: string ) => void, handleClear: () => void }) => {
    const [ searchTerm, setSearchTerm ] = useState<string>( '' )

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchTerm( e.target.value );
        handleSearch( e.target.value )
    }

    const clearAll = () => {
        setSearchTerm( `` )
        handleClear()
    }

    return (
        <div className="my-5 flex gap-2">
            <TextField className="w-[300px]" id="search-input" label={SearchLabel} variant="outlined" value={searchTerm} onChange={handleChange}/>
            <button onClick={clearAll}>
                <ClearIcon />
            </button>
      </div>
    )
}