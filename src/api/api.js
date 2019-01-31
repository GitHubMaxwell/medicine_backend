'use strict';
import express from 'express';
import User from '../models/user_model.js';
import noId from '../middleware/noId.js';
import badReq from '../middleware/badReq.js';
import sendJSON from '../middleware/sendJSON.js';

const router = express.Router();

// GET USER
router.get('/api/v1/user/:id', (req, res, next) => {
  if (!req.params.id) {
    noId(res);
  }
  User.findById(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);
});

// GET ALL USERS
router.get('/api/v1/users', (req, res, next) => {
  User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(next);
});

// ADD USER
router.post('/api/v1/user', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    badReq(res);
  }

  let newUser = new User(req.body);
  newUser
    .save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

// UPDATE USER
router.put('/api/v1/user/:id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    badReq(res);
  }

  if (req.params.id) {
    let updateTarget = { _id: `${req.params.id}` };
    User.findOneAndUpdate(updateTarget, req.body, { new: true })
      .then(data => {
        sendJSON(res, data);
      })
      .catch(next);
  } else {
    noId(res);
  }
});

// DELETE ONE USER
router.delete('/api/v1/user/:id', (req, res, next) => {
  User.remove({ _id: `${req.params.id}` })
    .then(data => sendJSON(res, data))
    .catch(next);
});

// DELETE ALL USERS
router.delete('/api/v1/deleteall/users', (req, res, next) => {
  User.deleteMany({})
    .then(data => sendJSON(res, data))
    .catch(next);
});

export default router;
