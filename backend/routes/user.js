const express = require('express');
const {
  getUsers, getUserById, getUserInfo, updateUserInfo, updateAvatar,
} = require('../controllers/user');
const { validateObjId, validateUserUpdate, validateAvatarUpdate } = require('../validators');

const router = express.Router();

router.get('/api//users', getUsers);
router.get('/api//users/me', getUserInfo);
router.patch('/api//users/me', validateUserUpdate, updateUserInfo);
router.patch('/api//users/me/avatar', validateAvatarUpdate, updateAvatar);
router.get('/api//users/:id', validateObjId, getUserById);

module.exports = router;
