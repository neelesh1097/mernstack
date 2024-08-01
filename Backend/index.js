const express =require('express');
const User = require('./db/user');
require('./db/config');
const cors =require("cors");
const Product = require('./db/product');
const jwt =require('jsonwebtoken')
const jwtkey = 'e-com'

const app = express();


app.use(express.json());
app.use(cors());

app.param('id', (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }
    next();
});

app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        }).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send("Something went wrong");
                } else {
                    resp.send({ user, auth: token });
                }
            });
        } else {
            resp.send({ result: 'No user found' });
        }
    } else {
        resp.status(400).send({ result: 'Email and password are required' });
    }
});


app.post('/signup', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send("Something went wrong");
        } else {
            resp.send({ result, auth: token });
        }
    });
});


app.post('/add', async(req,resp) =>{
    let product = new Product(req.body)
    let result = await product.save()
    resp.send(result)
})


app.get('/product' ,async(req,resp) => {
    let product = await Product.find(req.body)
    if(product.length >0){
        resp.send(product)
    }
    else{
        resp.send('product not found')
    }

})
app.delete('/product/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.status(404).send({ result: "No result found" });
    }
});

app.put("/product/:id", async (req, res) => {
    const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
});

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})



app.listen(5000);