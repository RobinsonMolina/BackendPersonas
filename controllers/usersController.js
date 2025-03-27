let users = []; // 💾 Se almacena solo mientras el servidor esté encendido

const getUsers = (req, res) => {
    res.json(users);
};

const addUser = (req, res) => {
    try {
        console.log("📩 Recibiendo usuario:", req.body);

        const newUser = req.body;

        if (!newUser || !newUser.name || !newUser.email) {
            console.log("⚠️ Datos inválidos:", newUser);
            return res.status(400).json({ message: "Datos inválidos" });
        }

        users.push(newUser); // 🔥 Solo se guarda en memoria, no en archivos
        console.log("✅ Usuario agregado:", newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error("❌ Error en addUser:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { getUsers, addUser };
