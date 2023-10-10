const express = require('express');
const app = express();
require('dotenv').config();
const { v4 } = require('uuid');
const Joi = require('joi');
const logger = require('./logger');
const morgan = require('morgan');
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(helmet());

const users = [];
const minName = 3;
// User larni response qilib yuborish
app.get('/users', (req, res) => {
    res.status(200).send(users);
});
// Yangi User qo'shish
app.post('/users', (req, res) => {
    const { error, value } = validateUser(req.body);
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

// User ma'lumotlarini yangilash
app.put('/users/:id', (req, res) => {
    // User-ni id orqali topish
    const user = users.find(u => u.id === req.params.id);
    // User topilmasa 404 error qaytarish
    if (!user) {
        return res.status(404).send('User topilmadi');
    }
    // User topilsa so'rovni validatsiya qilish
    const { error, value } = validateUser(req.body);
    // User validatsiyadan o'tmasa, 400 bad req qaytarish
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    // User-ni yangilash
    user.name = req.body.name;
    user.stack = req.body.stack;
    // Yangilangan User-ni qaytarish(res)
    res.status(200).send(user);
})

// User-ni o'chirish
app.delete('/users/:id', (req, res) => {
    // User-ni id orqali topish
    const user = users.find(u => u.id === req.params.id);
    // User topilmasa 404 error qaytarish
    if (!user) {
        return res.status(404).send('User topilmadi :(');
    }
    // O'chirish kerak bo'lgan user-ni aniqlash;
    const userIndex = users.indexOf(user);
    // User-ni o'chirish;
    users.splice(userIndex, 1);
    //  O'chirilgan user-ni ko'rsatish
    res.status(200).send(user);
})

// User-ni ID orqali topish
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).send('User topilmadi')
    }
    res.status(200).send(user);
});


// User-ni validate qilish funksiyasi
function validateUser(user) {
    const userSchema = Joi.object({
        name: Joi.string().min(minName).required(),
        stack: Joi.string().required()
    });
    return userSchema.validate(user);
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server ${PORT}`))