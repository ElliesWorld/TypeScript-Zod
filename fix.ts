//GET something (get a pizza)
//POST give new information (I want to add a new dish to the menu)
//PUT updating (Please change my pizza to a pasta)
//DELETE cancel my order
//Once waiter is back it doesnt remember anything
//In REST we get back xml or json format

import { z } from "zod";
import express from "express";
const app = express();

app.use(express.json());

// Define PORT variable
const PORT = 3000;

// Define interface for Pastry
interface Pastry {
    id: number;
    name: string;
    price: string;
}

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Zod schema for validation
const PastrySchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().min(1, "Price is required")
});

// Array with two objects
let pastries: Pastry[] = [
    {
        id: 1, 
        name: "Princess cake", 
        price: "350"
    },
    {
        id: 2, 
        name: "Semla", 
        price: "90"
    },
];

//Request the json from the pastries
app.get("/pastries", (req, res) => {
    res.json(pastries);
});

//Add pastries
app.post("/pastries", (req, res) => {
    try {
        const validate = PastrySchema.parse(req.body);
        const newPastry: Pastry = {
            //A unique ID every time (lenght + 1) 
            id: pastries.length + 1,
            name: validate.name,
            price: validate.price,
        };

        pastries.push(newPastry);
        res.json({ message: "Pastry added successfully!", pastry: newPastry });
    }
    catch (error)
    {
          res.status(400).json({ error: "Invalid data"});
    }
});

//Update already existing pastries
app.put("/pastries/:id", (req, res) => {
    const validation = PastrySchema.safeParse(req.body);
    const pastryId = parseInt(req.params.id);
    const pastry = pastries.find(a => a.id === pastryId);
    if (!pastry) {
        return res.status(404).json({ message: "Pastry not found!" });
    }
    if (!validation.success) {
        res.status(400).json({
            error: "Validation failed",
            details: validation.error.issues
        });
    } else {
        pastry.name = validation.data.name || pastry.name;
        pastry.price = validation.data.price || pastry.price;
        res.json({ message: "Pastry updated successfully!", pastry });
    }
});

//Delete the pastry with the id entered  
app.delete("/pastries/:id", (req, res) => {
    const pastryId = parseInt(req.params.id);
    pastries = pastries.filter((a) => a.id !== pastryId);
    res.json({ message: "Pastry deleted successfully!" });
});