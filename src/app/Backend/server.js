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
  // Registration Endpoint
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

  // Login endpoint
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
      const token = jwt.sign({ username: user.username }, 'secret_jwt_secret', {expiresIn: '2h'});
      res.status(200).json({message:'Login successful', token});
      
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Login failed'});
    }
  });

  // SONG ENDPOINTS
  // Endpoint to add song to DB
  app.post('/addSong', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
      }
  
      // Verify and decode token
      let decoded;
      try {
        decoded = jwt.verify(token, 'secret_jwt_secret');
      } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      const username = decoded.username; 
  
      const {title, instrument, file} = req.body;
      // connect to DB
      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      // song doc
      const newSong = ({
        username,
        title,
        instrument,
        file,
      })
      // insert into DB
      await songsCollection.insertOne(newSong);
      res.status(201).json({ message: 'Song added successfully!'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add Song'});
    }  
  })

  
  // Endpoint to get a song by ID
  app.get('/getSong/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      const song = await songsCollection.findOne({ _id: new ObjectId(id) });
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      console.log("comments: ", song.comment);
      res.status(200).json(song);
    } catch (err) {
      console.error("Error fetching song by ID: ", err);
      res.status(500).json({ message: 'Failed to fetch song' });
    }
  });
  // Endpoint to update the comment of a song by ID
  app.put('/updateSong/:id', async (req, res) => {
    try {
      const id = req.params;
      const comment  = req.body;
      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      // Update the song document with the new comment
      const result = await songsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { comment: comment } }
      );

      res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error("Error updating comment: ", err);
      res.status(500).json({ message: 'Failed to update comment' });
    }
  });

  // Endpoint to get all songs from DB
  app.get('/getSongs', async (req, res) => {
    const db = client.db('Musiimaker');
    const songsCollection = db.collection('Songs');
    // gets all the songs and puts them into an array that is sent to the feed
    const songList = await songsCollection.find().toArray();
    res.json(songList);
  })

  // Endpoint to get THE CURRENT user's songs
  app.get('/getCurrentUserSongs', async (req,res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
      }
      let decoded;
      try {
        decoded = jwt.verify(token, 'secret_jwt_secret');
      } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      const username = decoded.username;

      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      const currentUserSongs = await songsCollection.find({ username: username}).toArray();
      res.status(200).json(currentUserSongs);
    } catch (err) {
      console.error("Error fetching current user's songs: ", err);
      res.status(500).json({message:'Failed to fetch current user songs'});
    }
  })

  //Endpoint to get songs by a username
  app.get('/getSongs/:username', async (req,res) => {
    try {
      const { username } = req.params;
      const db = client.db('Musiimaker');
      const songsCollection = db.collection('Songs');
      const currentUserSongs = await songsCollection.find({ username: username}).toArray();
      res.status(200).json(currentUserSongs);
    } catch (err) {
      console.error("Error fetching current user's songs: ", err);
      res.status(500).json({message:'Failed to fetch current user songs'});
    }
  })

  app.get("/getCurrentUser", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({message: "Authentication token is missing"});
      }
      let decoded;
      try {
        decoded = jwt.verify(token, "secret_jwt_secret");
      } catch (err) {
        return res.status(403).json({message: "Invalid or expired token"});
      }
      const username = decoded.username
      
      const db = client.db("Musiimaker");
      const usersCollection = db.collection('Users');
      const currentUser = await usersCollection.findOne({username});
            
      if (!currentUser) {
        return res.status(404).json({ message: 'Current user not found' });
      }
      res.status(200).json(currentUser);
    } catch (err) {
      console.error("Error fetching current user: ", err);
      res.status(500).json({message: "Failed to fetch current user"});
    }
  })