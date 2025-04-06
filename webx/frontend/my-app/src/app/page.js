"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState([{ key: "", value: "" }]);

  // Fetch backend greeting (optional)
  useEffect(() => {
    fetch("http://127.0.0.1:8001")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // Add new row
  const addRow = () => {
    setRows([...rows, { key: "", value: "" }]);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // Submit data
  const handleSubmit = () => {
    const payload = {};
    rows.forEach((row) => {
      if (row.key) payload[row.key] = row.value;
    });

    fetch("http://127.0.0.1:8001/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from backend:", data);
        alert("Submitted successfully!");
      })
      .catch((err) => console.error("Submit error:", err));
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Message from Backend:</h1>
      <p className="mb-6">{message || "Loading..."}</p>

      {rows.map((row, idx) => (
        <div key={idx} className="flex space-x-2 mb-3">
          <input
            className="border rounded p-2 w-1/2"
            placeholder="Key"
            value={row.key}
            onChange={(e) => handleChange(idx, "key", e.target.value)}
          />
          <input
            className="border rounded p-2 w-1/2"
            placeholder="Value"
            value={row.value}
            onChange={(e) => handleChange(idx, "value", e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mr-4"
        onClick={addRow}
      >
        ➕ Add Row
      </button>

      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        onClick={handleSubmit}
      >
        ✅ Submit
      </button>
    </main>
  );
}
