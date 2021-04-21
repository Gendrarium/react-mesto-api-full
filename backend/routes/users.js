const router = require('express').Router();
const { validateGetUserById, validateEditProfile, validateEditAvatar } = require('../middlewares/validatons');
const {
  getUsers, getUserById, getUserMe, editProfile, editAvatar, logout,
} = require('../controllers/users');

router.get('/logout', logout);
router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:userId', validateGetUserById, getUserById);
router.patch('/users/me', validateEditProfile, editProfile);
router.patch('/users/me/avatar', validateEditAvatar, editAvatar);

module.exports = router;
