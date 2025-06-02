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
        text: `Welcome to our car rental service!
        - We have a total of 9 cars available, 
        -including a variety of types such as pickup, SUV, compact, and even sport cars.
        - Our luxury Ferrari is available for $6000,
        - while affordable options like the Toyota Hilux are just $1680. 

        -We offer a 10% discount on all rentals. 
        -You can pay using both local chapa  and foreign stripe payment methods. 
        -To rent a car, simply add your preferred vehicle to the cart, then proceed to rent and reserve it. 
        -If you have any questions about our cars, pricing, or the rental process, just ask!
         {
      _id: '4',
      model: 'Mini JCW',
      licencePlate: 'A4A4',
      gltfFile: '',
   
      price: 500,
      type: 'suv',
      subType: 'affordable',
      description: 'The Mini JCW is a sporty and compact SUV that offers a fun driving experience. It features a stylish design, responsive handling, and modern technology.'
    },
    {
      _id: '5',
      model: 'Volkswagen Viloran',
      licencePlate: 'A5A5',
      gltfFile: '',
    
      price: 700,
      type: 'suv',
      subType: 'affordable',
      description: 'The Volkswagen Viloran is a spacious SUV that combines practicality and comfort. It is equipped with advanced safety features and a modern infotainment system.'
    },
     {
      _id: '6',
      model: 'Lexus GX',
      licencePlate: 'A6A6',
      gltfFile: '',
  
      price: 2000,
      type: 'suv',
      subType: 'luxury',
      description: 'The Lexus GX is a luxury SUV that offers a premium driving experience. It features a refined interior, powerful engine, and advanced safety technologies.'
    },
    {
      _id: '7',
      model: 'BMW M8 Coup',
      licencePlate: 'A7A7',
      gltfFile: '',
   
      price: 2000,
      type: 'suv',
      subType: 'luxury',
      description: 'The BMW M8 Coup is a high-performance luxury SUV. It combines sporty design, cutting-edge technology, and exceptional comfort for an unparalleled driving experience.'
    },
    {
      _id: '8',
      model: 'Audi R8',
      licencePlate: 'A8A8',
      gltfFile: '',
      
      price: 3000,
      type: 'sport car',
      subType: 'luxury',
      description: 'The Audi R8 is a luxury sports car that delivers thrilling performance and a sleek design. It is equipped with a powerful engine and advanced driving technologies.'
    },
    {
      _id: '9',
      model: 'Ferrari 599 GTO',
      licencePlate: 'A9A9',
      gltfFile: '',
      
      price: 6000,
      type: 'sport car',
      subType: 'luxury',
      description: 'The Ferrari 599 GTO is a high-performance sports car that offers unmatched speed and precision. It features a striking design and cutting-edge engineering.'
    },




        `
        }]
},
                {
                    role: "user",
                    parts: [{ text: "Hi" }],
                },
            
            ]
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