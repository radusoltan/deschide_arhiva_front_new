import {NextResponse} from "next/server";


export async function GET(request) {

  const url = new URL(request.url);

  const imgId = url.searchParams.get("ImageId")

  const id = 165766

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}get_img?ImageId=${id}`)

  const json = await response.json();

  return NextResponse.json(json.url)
}