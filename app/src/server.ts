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
import { Role, Appointment, User } from "./db/models";
import sequelize from "./db/models/config";

console.log("ROLE------", Role);

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    
    const user1 = await User.create({email: 'gravcon5@gmail.com', password: 'password', username: 'zelazny7'});
    const user2 = await User.create({email: 'bobbyboop@gmail.com', password: 'password', username: 'bibby'});
    await Role.create({ id: 1, name: "user" });
    await Role.create({ id: 2, name: "moderator" });
    await Role.create({ id: 3, name: "admin" });

    await user1.setRoles([2, 3]);
    await user2.setRoles([1]);
 
    // try to create an appointment
    const appt = await Appointment.create({
      is_unavailable: false
    });

    await appt.setUsers([user1, user2]);

    const mods = await appt.getUsersByRole('moderator');
    const users = await appt.getUsersByRole('user');

    console.log(mods);
    console.log(users);

    console.log("Number of users!", (await appt.getUsers()).length);

    

    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
}

initDatabase();

// set routes on the application
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { DATE } from "sequelize";

authRoutes(app);
userRoutes(app);

// set port and listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



