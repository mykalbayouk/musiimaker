// db pass: JBPQY0r8GRKOfnHV
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://jlgreer2002:JBPQY0r8GRKOfnHV@musiicluster.4ruu2.mongodb.net/?retryWrites=true&w=majority&appName=Musiicluster';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Test MongoDB connection
app.get('/ping', async (req, res) => {
    try {
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      res.status(200).json({ message: 'MongoDB connected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to connect to MongoDB' });
    } finally {
      await client.close();
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // USER ENDPOINTS
  app.post('/addUser', async (req, res) => {
    try {
      const {username, email, password} = req.body;
      // connect to DB
      const db = client.db('Musiimaker');
      const usersCollection = db.collection('Users');
      // Check if email or username already exists
      const exisitingEmail = await usersCollection.findOne({email});
      if (exisitingEmail) {
        return res.status(400).json({ message: 'Email already in use'});
      }
      const exisitingUser = await usersCollection.findOne({username});
      if (exisitingUser) {
        return res.status(400).json({ message: 'Username already in use'});
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // user doc
      const newUser = {
        username,
        email,
        password: hashedPassword,
      };
      // insert into DB
      await usersCollection.insertOne(newUser);
      res.status(201).json({message: 'User registered successfully'})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add user'});
    } 
  });

  app.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body;
      const db = client.db('Musiimaker');
      const usersCollection = db.collection('Users');
      // find user by email
      const user = await usersCollection.findOne({email});
      if (!user) {
        return res.status(400).json({message: 'Invalid email or password!'});
      }
      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({message: 'Invalid email or password!'});
      }
      // generate a JWT valid for two hours 
      const token = jwt.sign({ userId: user._id, email: user.email }, 'secrew_jwt_secret', {expiresIn: '2h'});
      res.status(200).json({message:'Login successful', token});
      
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Login failed'});
    }
  });

  // SONG ENDPOINTS
  app.post('/addSong', async (req, res) => {
    try {
      const {title, username, song_file} = req.body;
      // connect to DB
      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      // song doc
      const newSong = ({
        title,
        username,
        song_file,
      })
      // insert into DB
      await songsCollection.insertOne(newSong);
      res.status(201).json({ message: 'Song added successfully!'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add Song'});
    }  
  })

