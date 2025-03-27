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
        console.log("📥 Datos recibidos en req.body:", req.body); // 🛠️ Verificar qué llega

        const users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        console.log("📄 Usuarios antes de agregar:", users); // Verificar si el archivo se lee bien

        const newUser = req.body;
        if (!newUser || !newUser.name || !newUser.email) {
            console.log("⚠️ Datos inválidos recibidos:", newUser);
            return res.status(400).json({ message: "Datos inválidos" });
        }

        users.push(newUser);
        console.log("✅ Usuario agregado en memoria:", users);

        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
        console.log("💾 Archivo actualizado correctamente");

        res.status(201).json(newUser);
    } catch (error) {
        console.error("❌ Error al agregar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};



module.exports = { getUsers, addUser };