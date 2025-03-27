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
        console.log("📥 req.body recibido:", req.body); // Ver qué está llegando

        if (!req.body || Object.keys(req.body).length === 0) {
            console.log("⚠️ El body está vacío en la solicitud del frontend");
            return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
        }

        const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        users.push(req.body);
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

        console.log("✅ Usuario agregado:", req.body);
        res.status(201).json(req.body);
    } catch (error) {
        console.error("❌ Error al agregar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


module.exports = { getUsers, addUser };