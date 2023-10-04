const express = require('express');
const app = express();
require('dotenv').config();
const { v4 } = require('uuid')

app.use(express.json())
app.use(express.urlencoded({
	extended: false
}));

app.use((req, res, next) => {
	console.log(`${req.method}: ${req.url}`);
	next();
})

const frends = [
	{
		firstname: 'Asror',
		lastname: "Shodiyev"
	},
	{
		firstname: 'Bexruz',
		lastname: "Raxmonov"
	}
];
app.get('/users', (req, res) => {
	res.send(frends);
});

app.get('/users/:item', (req, res) => {
	const { item } = req.params;
	const usersItem = frends.find((g) => g.item === item);
	res.send(usersItem);
})

app.post('/users', (req, res) => {
	console.log(req.body);
	frends.push(req.body);
	res.send(201);
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Server ${PORT}`);
})