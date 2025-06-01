import {GoogleGenerativeAI} from '@google/generative-ai'
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export class CHATBOT {
    constructor(model = 'gemini-2.0-flash') {
        const getModel = gemini.getGenerativeModel({ model });
        this.chatbot = getModel.startChat({
            history: [
           
                {
                    role: "model",
                    parts: [{ text: "Hello! Welcome to Car Rental. How can I assist you today?" }],
                },
                             {
                    role: "model",
                    parts: [{
                        text: `Our System is a cutting-edge car rental platform designed to provide an effortless and immersive vehicle rental experience. Our system features interactive 3D car views, allowing you to explore every angle of your chosen vehicle with 360° rotation, zoom functionality, and even previews for a realistic look before booking. Alongside this, our chatbot offers instant support, answering questions, assisting with bookings, and providing personalized recommendations—ensuring a smooth rental process from start to finish.

We cater to all your payment needs with seamless local and international options, including Stripe for card payments and Chapa for local transactions in Ethiopia. Our diverse fleet ranges from affordable compacts and luxury SUVs to high-performance sports cars and rugged pickup trucks, all available at competitive rates. With a user-friendly interface, real-time availability checks, and 24/7 customer support, DriveEase makes renting a car simple, secure, and convenient. Book today and hit the road with confidence! 🚗💨

Available Cars:
1. Hyundai Creta (A1A1) - Compact SUV, affordable, $2000
2. Mercedes-cls-63 (A2A2) - Compact, affordable, $1000
3. LandRover (A3A3) - SUV, affordable, $1000
4. Mini JCW (A4A4) - SUV, affordable, $500
5. Volkswagen Viloran (A5A5) - SUV, affordable, $700
6. Lexus GX (A6A6) - SUV, luxury, $2000
7. BMW M8 Coup (A7A7) - SUV, luxury, $2000
8. Audi R8 (A8A8) - Sport car, luxury, $3000
9. Ferrari 599 GTO (A9A9) - Sport car, luxury, $6000
10. Hyundai Kona (B1B1) - Compact, affordable, $1000
11. Maruti Suzuki Swift Dzire (B2B2) - Compact, affordable, $800
12. Mercedes-Benz Maybach GLS (B3B3) - SUV, luxury, $1300
13. Nissan Nismo (B4B4) - Sport car, luxury, $3400
14. Porsche 918 (B5B5) - Sport car, luxury, $3000
15. Ram (B6B6) - Pickup, affordable, $1030
16. Skoda Superb (B7B7) - Compact, affordable, $1030
17. Suzuki Ertiga (B8B8) - Compact, affordable, $830
18. Toyota Hilux (B9B9) - Pickup, affordable, $1630

Ask me about any car or feature!`
                    }]
                },
                 {
                    role: "model",
                    parts: [{ text: "man " }]
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