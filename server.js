const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync the database

const db = require('./app/models');
const Role = db.role;

async function initDatase(db) {
    try {
        await db.sequelize.sync({force: true});
        console.log("DB Synced");
    } catch(err) {
        console.log(err);
    }  
};

initDatase(db);

app.get("/", (req, res) => {
  res.json({ message: "welcome to easier appiontments!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
