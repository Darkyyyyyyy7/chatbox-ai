import React, { useState } from "react";
import { scrapeWebsite, chatWithBot } from "./api";
import "./App.css";


function App() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleScrape = async () => {
    await scrapeWebsite(url);
    alert("Scraping completed!");
  };

  const handleChat = async () => {
    try {
      const response = await chatWithBot(query);
      if (response.data && response.data.response) {
        setChatResponse(response.data.response); // ✅ Prevents undefined error
      } else {
        setChatResponse("No response from chatbot.");
      }
    } catch (error) {
      setChatResponse("Error contacting chatbot.");
      console.error("Chat API error:", error);
    }
  };


  return (
    <div>
      <h2>Web Scraper & Chatbot</h2>
      <div>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleScrape}>Scrape</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Ask a question"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleChat}>Chat</button>
      </div>
      <p>
        <strong>Chatbot Response:</strong> {chatResponse}
      </p>
    </div>
  );
}

export default App;
