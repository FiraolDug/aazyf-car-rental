import {GoogleGenerativeAI} from '@google/generative-ai'
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export class CHATBOT {
    constructor(model = 'gemini-2.0-flash') {
        const getModel = gemini.getGenerativeModel({ model });
        this.chatbot = getModel.startChat({
            history: [
                    {
            role: "user",
            parts: [{ text: "Hi" }],
        },
           
                {
                    role: "model",
                    parts: [{ text: "Hello! Welcome to Car Rental. How can I assist you today?" }],
                },
                             {
                    role: "model",
                    parts: [{
                        text: `
1. Hyundai Creta (A1A1) price:$2000 `
                    }]
                },
                 {
                    role: "model",
                    parts: [{ text: "nissan price=300$ " }]
                },
                {
                    role: "user",
                    parts: [{ text: "Hi" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Welcome! How can I help you?" }],
                },
            ],
        });
    }

    async chat(content) {
        try {
        
            const result = await this.chatbot.sendMessage(content);
            return result.response.text();
        } catch (error) {
            console.error("Error in chatbot:", error);
            return "Sorry, something went wrong.";
        }
    }
}