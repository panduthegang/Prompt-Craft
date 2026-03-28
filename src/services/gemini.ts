import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function enhancePrompt(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `You are an expert UI/UX designer and frontend developer. Enhance the following user prompt to be highly detailed, specifying modern design trends, Tailwind CSS utility classes, accessibility, and responsive design. Make it a clear instruction for generating a component. Return ONLY the enhanced prompt text, without any conversational filler or markdown formatting.\n\nOriginal prompt: ${prompt}`,
    });
    return response.text?.trim() || prompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw new Error("Failed to enhance prompt.");
  }
}

export interface ComponentVariation {
  title: string;
  description: string;
  code: string;
}

export async function generateComponents(prompt: string): Promise<ComponentVariation[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `You are an expert frontend developer and UI/UX designer. The user wants a UI component based on this description: "${prompt}". 
      
Generate 3 DISTINCT, high-quality, modern variations of this component.

CRITICAL INSTRUCTIONS:
1. Use PURE HTML and Tailwind CSS ONLY.
2. DO NOT generate React components, JSX, or include any 'import' statements.
3. The HTML MUST be properly indented with line breaks for readability. Do not minify or put everything on one line.
4. The HTML should be a complete, renderable snippet (it will be placed inside the body tag). Do NOT include <html>, <head>, or <body> tags, just the component markup.
5. Ensure the components are responsive, accessible, and use modern Tailwind classes.

Variation ideas to consider (pick 3 distinct ones that fit the prompt):
- Minimalist & Clean
- Dark Mode / Glassmorphism
- Brutalist / High Contrast
- Playful / Colorful
- Neumorphic
- Enterprise / Professional

Return a JSON array of exactly 3 objects.`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "A short, catchy name for the variation's design style.",
              },
              description: {
                type: Type.STRING,
                description: "A short description of the design choices and vibe.",
              },
              code: {
                type: Type.STRING,
                description: "The complete HTML code snippet with Tailwind CSS classes. Do NOT wrap in markdown code blocks.",
              },
            },
            required: ["title", "description", "code"],
          },
        },
      },
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Empty response from Gemini");
    
    const variations: ComponentVariation[] = JSON.parse(text);
    return variations;
  } catch (error) {
    console.error("Error generating components:", error);
    throw new Error("Failed to generate components.");
  }
}
