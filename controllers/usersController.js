const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/users.json");

// Obtener todos los usuarios
const getUsers = (req, res) => {
    const users = JSON.parse(fs.readFileSync(dataPath));
    res.json(users);
};

// Agregar un nuevo usuario
const addUser = (req, res) => {
    const users = JSON.parse(fs.readFileSync(dataPath));
    const newUser = req.body;

    users.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

    res.status(201).json(newUser);
};

module.exports = { getUsers, addUser };
