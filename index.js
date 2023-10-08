const express = require('express');
const app = express();
require('dotenv').config();
const { v4 } = require('uuid');
const Joi = require('joi')

app.use(express.json());
app.use(express.urlencoded());

const users = [];
const minName = 3;
// User larni response qilib yuborish
app.get('/users', (req, res) => {
    res.send(users);
});
// User-ni Validatsiya qilish uchun sxema || Joi package
userSchema = Joi.object({
    name: Joi.string().min(minName).required(),
    stack: Joi.string().required()
})

// Yangi User qo'shish
app.post('/users', (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = {
        id: v4(),
        name: req.body.name,
        stack: req.body.stack
    }
    users.push(user);
    res.status(201).send(user);
});

// User-ni ID orqali topish
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        res.send("User topilmadi")
    }
    res.send(user)
})
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server ${PORT}`))