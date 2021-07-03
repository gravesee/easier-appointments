import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync the database

import { IDatabase, db } from "./models";

async function initDatase(db: IDatabase) {
  try {
    await db.sequelize.sync({ force: true });

    await db.role.create({ id: 1, name: "user" });
    await db.role.create({ id: 2, name: "moderator" });
    await db.role.create({ id: 3, name: "admin" });

    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
}

initDatase(db);

app.get("/", (req, res) => {
  res.json({ message: "welcome to easier appiontments!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
