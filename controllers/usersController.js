let users = []; // 💾 Se almacena solo mientras el servidor esté encendido

const getUsers = (req, res) => {
    res.json(users);
};

const addUser = (req, res) => {
    try {
        console.log("📩 Recibiendo usuario:", req.body);

        const { name, email, telefono, ocupacion } = req.body;

        if (!name || !email || !telefono || !ocupacion) {
            console.log("⚠️ Datos inválidos:", req.body);
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newUser = { name, email, telefono, ocupacion };
        users.push(newUser); // 🔥 Solo se guarda en memoria

        console.log("✅ Usuario agregado:", newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("❌ Error en addUser:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { getUsers, addUser };
