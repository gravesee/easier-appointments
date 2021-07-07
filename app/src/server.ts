require('dotenv').config({ path: __dirname + "/../.env" });
import express from "express";
import cors from "cors";
import { sessionMiddleware } from "./middleware/session";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Sync the database
import sequelize from "./db/models/config";
import { Role } from "./db/models/role.model";

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    await Role.create({ id: 1, name: "user" });
    await Role.create({ id: 2, name: "moderator" });
    await Role.create({ id: 3, name: "admin" });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
}

initDatabase();

// set routes on the application
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

authRoutes(app);
userRoutes(app);

// set port and listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



