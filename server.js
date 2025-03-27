const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

// Importar controladores
// const { getUsers, addUser } = require("./controllers/userController");

// app.get("/api/users", getUsers);
// app.post("/api/users", addUser);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));