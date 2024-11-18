import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './models/product.models.js'
//import router from './routes/product.routes.js';


const app = express();
const PORT = 4000;
app.use(bodyParser.json());


//app.use("api/products", router);




app.get("/", (req, res) => {
    res.send('Hello from hompage of api')
});



 //GET API
 app.get('/api/products', async (req,res) => {
     try {
         const products = await Product.find({});
         res.status(201).json(products);
     } catch (error) {
      res.status(500).json({message: error.message})   
     }
 })

// GET API BY ID

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// POST API

app.post('/api/products', async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
})



// UPDATE API
app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!Product){
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// DELETE API
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
       const product = await Product.findByIdAndDelete(id)
       if(!product){
        res.status(404).json({message: "Product not found"})
       }
       res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




mongoose.connect('mongodb+srv://auwaluizziddin2212:yMbCnZuH3Xq2yXmQ@cluster0.uobdn.mongodb.net/my_first_mongodb_project?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("connected to database")
}).catch(() => {
    console.log("connection failed");
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

