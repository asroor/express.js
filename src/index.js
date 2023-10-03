const express = require('express');
const app = express();
require('dotenv').config();
const { v4 } = require('uuid')

app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))

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

app.get('/', (req, res) => {
	res.send(frends);
});

app.post('/', (req, res) => {
	console.log(req.body);
	frends.push(req.body);
	res.send(201);
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Server ${PORT}`);
})