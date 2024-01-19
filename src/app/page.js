"use client";
import React, { useState } from "react";

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [classificationResult, setClassificationResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleclick = async () => {
    setLoading(true);
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailText }),
    });
    const data = await response.json();
    setClassificationResult(data.data.result);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Email Spam Classifier</h1>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          rows="6"
          placeholder="Enter email text..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        ></textarea>
        {
          classificationResult && (
            <div className="mt-4">
              <strong>Classification Result:</strong> {classificationResult === 'Spam' ? (
                <span className="text-red-500">This is Spam</span>
              ) : (
                <span className="text-green-500">This is Not Spam</span>
              )}
            </div>
          )
        }
        
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={handleclick}
          disabled={loading}
        >
          Classify Email
        </button>

      </div>
    </main>
  );
}
