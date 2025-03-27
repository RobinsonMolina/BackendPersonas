const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/users.json");

// Obtener todos los usuarios
const getUsers = (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Agregar un nuevo usuario
const addUser = (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        const newUser = req.body;

        if (!newUser || Object.keys(newUser).length === 0) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        users.push(newUser);
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { getUsers, addUser };
