import { NextRequest, NextResponse } from "next/server";
import { useEffect } from "react";
export async function GET(req: NextRequest) {

  try {
      const data = await req.json();
      console.log('hi');
      return NextResponse.json({ hi: 'hi' }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
