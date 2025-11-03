import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const suggestTitle = async (content: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Suggest a catchy and SEO-friendly blog post title for the following article content. Provide only the title text, without any quotes or introductory phrases. Content: "${content}"`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating title with Gemini API:", error);
    return "Error generating title. Please try again.";
  }
};