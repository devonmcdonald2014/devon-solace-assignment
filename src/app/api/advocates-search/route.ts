import db from "@/db/index";
import { advocates } from "@/db/schema";
import { and, ilike, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest ) {
    try {
        const data = await req.json();
        const queryData = await db.select().from( advocates ).where(
            !data?.category ? 
            or(
                ilike( advocates.firstName, `%${data.searchTerm}%` ),
                ilike( advocates.lastName, `%${data.searchTerm}%` ),
                ilike( advocates.city, `%${data.searchTerm}%` ),
                ilike( advocates.degree, `%${data.searchTerm}%` ),
                sql`
                    CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${'%' + data.searchTerm + '%'}
                ` ,
                sql`
                    EXISTS (
                    SELECT 1 FROM unnest(${advocates.specialties}) AS specialty
                    WHERE specialty ILIKE ${'%' + data.searchTerm + '%'}
                    )
                `
                )
            :
            and(
                or (
                    ilike( advocates.firstName, `%${data.searchTerm}%` ),
                    ilike( advocates.lastName, `%${data.searchTerm}%` ),
                    ilike( advocates.city, `%${data.searchTerm}%` ),
                    ilike( advocates.degree, `%${data.searchTerm}%` ),
                    sql`
                        CAST(${advocates.phoneNumber} AS TEXT) ILIKE ${'%' + data.searchTerm + '%'}
                    ` 
                ),
                sql`
                EXISTS (
                SELECT 1 FROM unnest(${advocates.specialties}) AS specialty
                WHERE specialty ILIKE ${'%' + data.category + '%'}
                )
            ` )
            )
      
        return NextResponse.json({ data: queryData })
    } catch ( e ) {
        console.error ( e )
    }

}
