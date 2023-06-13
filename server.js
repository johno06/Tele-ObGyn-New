require ('dotenv').config ();
const dbConfig = require ('./config/dbConfig');
const cors = require ('cors');
const express = require ('express');
const history = require ('connect-history-api-fallback');
const path = require ('path');

const app = express ();
app.use (express.json ());
app.use (
  cors ({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://fuentes-clinic-website.onrender.com',
    ],
  })
);

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

// Serve the static files from the client build directory
app.use (express.static (path.join (__dirname, 'client', 'public')));

<<<<<<< HEAD
const app = express();
app.use(express.json());
app.use(cors({
  credentials:true,
  origin:["http://localhost:3000", "https://fuentes-clinic-website.onrender.com"]
}));
=======
// Enable URL rewriting for client-side routing
app.use (
  history (
    {
      // Add options if needed
    }
  )
);
>>>>>>> johno/Reco(charts,-create-acc,-at-ID-sa-heading-nalang)

// Serve the index.html file for all routes
app.get ('*', (req, res) => {
  res.sendFile (path.join (__dirname, 'client', 'public', 'index.html'));
});

const userRoute = require ('./routes/userRoute');
const adminRoute = require ('./routes/adminRoute');
const doctorRoute = require ('./routes/doctorsRoute');
const utilityRoute = require ('./routes/utilityRoute');

app.use ('/api/user', userRoute);
app.use ('/api/admin', adminRoute);
app.use ('/api/doctor', doctorRoute);
app.use ('/api/utility', utilityRoute);

const port = process.env.PORT || 5000;

app.listen (port, () => console.log (`Listening on port ${port}`));
