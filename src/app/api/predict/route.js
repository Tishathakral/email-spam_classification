import { NextResponse } from "next/server";
export async function POST(request) {
  const { emailText } = await request.json();
  const response = await fetch("http://127.0.0.1:5000/api/predict",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: emailText }),
  });
    const data = await response.json();
    console.log(data);
    return NextResponse.json({
        data
    });
  }