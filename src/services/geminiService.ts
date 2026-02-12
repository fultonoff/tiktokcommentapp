
import { Platform } from "@/types/commentCreation/commentTypes";
import { GoogleGenAI } from "@google/genai";


export const generateComment = async (
  platform: Platform,
  context: string,
  tone: string
): Promise<string> => {
  // Always use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a highly realistic and engaging social media comment for ${platform}.
    Context about the post: "${context}"
    Desired Tone: ${tone}
    
    Requirements:
    - Keep it concise (like a real user).
    - Use platform-appropriate slang and emojis.
    - If it's Twitter, keep it under 280 characters.
    - Return ONLY the comment text. No quotes, no intro, no "Here is your comment".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Directly access the .text property from GenerateContentResponse
    return response.text || "Something went wrong. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating comment. Please check your context.";
  }
};
