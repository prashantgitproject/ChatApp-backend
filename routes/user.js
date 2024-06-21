import express from 'express'
import { acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from '../controllers/user.js';
import {  singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptRequestValidator, loginValidators, registerValidators, sendRequestValidator, validateHandler } from '../lib/validators.js';

const app = express.Router();

app.post('/new', singleAvatar, registerValidators(), validateHandler, newUser);
                                
app.post('/login', loginValidators(), validateHandler, login);

// after login
app.use(isAuthenticated);

app.get('/me', getMyProfile);

app.get('/logout', logout);

app.get('/search', searchUser);

app.put('/sendrequest', sendRequestValidator(), validateHandler,  sendFriendRequest)

app.put('/acceptrequest', acceptRequestValidator(), validateHandler,  acceptFriendRequest);

app.get('/notifications',  getMyNotifications);

app.get('/friends',  getMyFriends)

export default app;