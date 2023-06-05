const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.use(cors());


mongoose.connect(process.env.MONGODB);

const inventorySchema = new mongoose.Schema({
    itemid: String,
    name: String,
    price: Number,
    stock: Number
})

const Inventory = mongoose.model("Inventory", inventorySchema)

app.post('/form', (req, res) => {

    const inventory = new Inventory({
        itemid: req.body.ItemId,
        name: req.body.ItemName,
        price: req.body.ItemPrice,
        stock: req.body.ItemStock
    })

    inventory.save();


});


app.get("/form", async (req, res) => {
    let itemsArr = await Inventory.find({});
    res.json(itemsArr);
})


app.delete('/delete/:clickedBtnId', async (req, res) => {
    const clickedBtnId = req.params.clickedBtnId;
    await Inventory.findOneAndDelete({ _id: clickedBtnId });
})


app.post("/update/:pencilBtnId", async (req, res) => {
    
    const pencilBtnId = req.params.pencilBtnId;

    if(req.body.id.trim().length > 0){
        await Inventory.updateOne({_id : pencilBtnId} , {$set:{itemid : req.body.id}})
    }
    if(req.body.name.trim().length > 0){
        await Inventory.updateOne({_id : pencilBtnId} , {$set:{name : req.body.name}})
    }
    if(req.body.price.trim().length > 0){
        await Inventory.updateOne({_id : pencilBtnId} , {$set:{price : req.body.price}})
    }
    if(req.body.stock.trim().length > 0){
        await Inventory.updateOne({_id : pencilBtnId} , {$set:{stock : req.body.stock}})
    }
})



app.listen(4000, () => {
    console.log("EveryThing Working fine on port 4000");
})