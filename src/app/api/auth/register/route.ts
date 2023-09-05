import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password} = await req.json();
  console.log(email)
  return NextResponse.json({ msg: 'success'}, { status: 200 })
}
