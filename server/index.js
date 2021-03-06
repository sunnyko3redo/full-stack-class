require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const uc = require('./controllers/userController');
const pc = require('./controllers/postsController');
const authCheck = require('./middleware/authCheck');
const initSession = require('./middleware/initSession');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);

massive(CONNECTION_STRING).then(db => {
  console.log('db connected securely');
  app.set('db', db);
});

app.use(initSession);

// user endpoints
app.post('/api/login', uc.login);
app.post('/api/signup', uc.signup);
app.delete('/api/logout', uc.logout);
app.get('/api/user', authCheck, uc.getUser);

// posts endpoints
app.get('/api/posts/:userId', pc.getPosts);
app.delete('/api/posts/:postId', pc.deletePost);
app.put('/api/posts/edit/:postId', pc.editPost);
app.post('/api/posts', pc.savePost);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
