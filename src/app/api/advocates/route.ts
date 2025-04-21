import db from "@/db/index";
import { advocates } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {

  try {
  // Uncomment this line to use a database
  const data = await db.select().from(advocates);

  console.log( data )

  return NextResponse.json({ data })
  } catch ( e ) {
    console.error( e )
  }

}
