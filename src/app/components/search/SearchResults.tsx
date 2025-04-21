import { Advocate } from "@/types/advocate";
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatters";

export const SearchResults = ({ filteredAdvocates } :  { filteredAdvocates: Advocate[] | null }) => {
    const [ page, setPage ] = useState<number>( 1 )

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };


    if ( filteredAdvocates === null ) return <p className="font-light">Please enter a name, city, specialty, degree, or phone number to search for an advocate.</p>

    if ( !filteredAdvocates?.length ) return <p className="text-red-600 font-light">No advocates fit your current criteria. Please edit your search and try again....</p>
    
    const paginatedAdvocates = filteredAdvocates?.length > 10 ? filteredAdvocates?.slice( ( page - 1) * 10, ( ( page -1 ) * 10 ) + 10 > filteredAdvocates?.length ? filteredAdvocates.length : ( ( page - 1) * 10 ) + 10 ): filteredAdvocates

    return (
      <div className="flex flex-col items-center justify-center gap-3 px-3">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Specialties</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAdvocates?.map((advocate, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{advocate.firstName}</TableCell>
                  <TableCell>{advocate.lastName}</TableCell>
                  <TableCell>{advocate.city}</TableCell>
                  <TableCell>{advocate.degree}</TableCell>
                  <TableCell>
                    {advocate.specialties.map((s) => (
                      <p>{s}</p>
                    ))}
                  </TableCell>
                  <TableCell>{advocate.yearsOfExperience}</TableCell>
                  <TableCell>{formatPhoneNumber( advocate.phoneNumber?.toString() )}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

        {
          filteredAdvocates?.length > 10 &&
          <Pagination count={Math.ceil( filteredAdvocates?.length / 10 )} onChange={handleChange} />
        }

      </div>

    )
}