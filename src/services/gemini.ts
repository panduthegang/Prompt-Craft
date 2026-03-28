import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { formatCode } from "../lib/format"

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function enhancePrompt(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `You are an elite UI/UX designer and senior frontend architect. Enhance the following user prompt to be highly detailed, specifying cutting-edge modern design trends, advanced Tailwind CSS utility classes (like glassmorphism, complex gradients, animations), accessibility, and responsive design. Make it a clear instruction for generating a premium, award-winning component. Return ONLY the enhanced prompt text, without any conversational filler or markdown formatting.\n\nOriginal prompt: ${prompt}`,
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

export async function generateComponents(prompt: string, modelName: string = "gemini-3-flash-preview"): Promise<ComponentVariation[]> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `You are an elite, world-class Senior Frontend Engineer and UI/UX Designer. The user wants a UI component based on this description: "${prompt}". 
      
Generate 3 DISTINCT, breathtaking, high-end, and production-ready variations of this component. These should be the absolute best components built to date, utilizing the full power of modern web development, React, and Tailwind CSS.

CRITICAL INSTRUCTIONS:
1. Use React and Tailwind CSS ONLY.
2. DO NOT use any 'import' or 'export' statements. React is available globally as 'React'.
3. Write a single functional component named exactly 'GeneratedComponent'.
4. For icons, use raw inline SVGs. Do not import external icon libraries.
5. You can use React hooks (useState, useEffect) by accessing them directly from the global React object (e.g., React.useState).
6. Ensure the components are fully responsive, accessible, and use advanced modern Tailwind classes (e.g., backdrop-blur, complex gradients, grid layouts, animations, transitions, ring utilities, dark mode variants).
7. Push the boundaries of design. Use micro-interactions (hover/focus states), beautiful typography, perfect spacing, and stunning visual hierarchy.
8. Make it look like it belongs in a premium, award-winning SaaS product or a top-tier design agency's portfolio.
9. Return ONLY the raw JSX code for the component. Do not wrap it in markdown code blocks.
10. CRITICAL FORMATTING: The JSX code MUST be beautifully formatted with proper indentation (2 spaces) and line breaks. DO NOT return minified code or single-line code. Readability is paramount. Even if you are a fast model, you MUST format the code properly.

Variation ideas to consider (pick 3 distinct, high-end ones that fit the prompt):
- Apple-esque Glassmorphism & Blur
- Stripe-like FinTech Precision (Complex Gradients & Shadows)
- Vercel-style Dark Mode Developer Tool (Minimal, High Contrast, Glowing Accents)
- Linear-inspired Modern SaaS (Subtle borders, perfect typography, dark/light contrast)
- Awwwards-winning Creative Agency (Brutalist, large typography, unconventional layouts)

Return a JSON array of exactly 3 objects.`,
      config: {
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
                description: "The complete React JSX code snippet with Tailwind CSS classes. Do NOT wrap in markdown code blocks.",
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
    
    // Format the code for each variation
    for (let i = 0; i < variations.length; i++) {
      variations[i].code = await formatCode(variations[i].code);
    }
    
    return variations;
  } catch (error) {
    console.error("Error generating components:", error);
    throw new Error("Failed to generate components.");
  }
}
