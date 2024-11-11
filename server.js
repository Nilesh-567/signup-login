const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MongoDB connection URL and database name
const dbURI = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/Vercel";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Could not connect to MongoDB:", error));

// Define the schema and model for the 'project' collection
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    institute: String
});

const User = mongoose.model("project", userSchema); // Collection name is 'project'

app.post("/signup", async (req, res) => {
    const { email, password, institute } = req.body;
    const user = new User({ email, password, institute });

    try {
        await user.save();
        res.status(200).send("Signup successful!");
    } catch (error) {
        res.status(500).send("Error saving data: " + error);
    }
});



// for signin form 


app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find a user in the database with matching email and password
        const user = await User.findOne({ email, password });

        if (user) {
            res.status(200).send("Authentication successful!");
        } else {
            res.status(401).send("Authentication failed: Invalid email or password.");
        }
    } catch (error) {
        res.status(500).send("An error occurred: " + error);
    }
});

app.listen(3002, () => console.log("Server is running on http://localhost:3002"));
