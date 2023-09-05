import { NextRequest, NextResponse } from "next/server";
import { useEffect } from "react";
export async function POST(req: NextRequest, res: NextResponse) {
  // if (req.method === 'POST') {
  //   // Handle the POST request here
  //   const data = req.body; // Access the request body data
  //   res.json({ message: `Received POST data: ${data}` });
  // } else {
  //   res.status(405).end(); // Method Not Allowed for other HTTP methods
  // }
  // const response = await fetch(LEETCODE_GRAPHQL_URL, opts);
    // const resp = await response.json();
  return NextResponse.json({ hi: 'hi' }, { status: 200 });
}
