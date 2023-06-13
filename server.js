require ('dotenv').config ();
const dbConfig = require ('./config/dbConfig');
const cors = require ('cors');
const express = require ('express');
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

// Set Access-Control-Allow-Origin header
app.use ((req, res, next) => {
  res.setHeader (
    'Access-Control-Allow-Origin',
    'https://fuentes-clinic-website.onrender.com'
  );
  // Add other CORS headers if needed
  // ...

  next ();
});

// app.get ('/', (req, res) => {
//   res.send ('Hello World!');
// });

const userRoute = require ('./routes/userRoute');
const adminRoute = require ('./routes/adminRoute');
const doctorRoute = require ('./routes/doctorsRoute');
const utilityRoute = require ('./routes/utilityRoute');

app.use ('/api/user', userRoute);
app.use ('/api/admin', adminRoute);
app.use ('/api/doctor', doctorRoute);
app.use ('/api/utility', utilityRoute);

// Serve the static files from the build directory
app.use (express.static (path.join (__dirname, 'client', 'build')));

// Fallback route for client-side routing
app.get ('*', (req, res) => {
  res.sendFile (path.join (__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen (port, () => console.log (`Listening on port ${port}`));
