import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const scrapeWebsite = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/scrape`, { url });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      throw new Error(`Scrape failed with status: ${error.response.status}`);
    } else if (error.request) {
      console.error("Network error, no response received:", error.request);
      throw new Error("Network error. Please try again later.");
    } else {
      console.error("Error in request setup:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export const chatWithBot = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { query });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      throw new Error(`Chat failed with status: ${error.response.status}`);
    } else if (error.request) {
      console.error("Network error, no response received:", error.request);
      throw new Error("Network error. Please try again later.");
    } else {
      console.error("Error in request setup:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
