const router = require('express').Router();
const { updateUserInfoValidation, updateAvatarValidation, userIdValidation } = require('../middlewares/joiValidation');

const {
  getUsers, getUserById, updateUser, updateAvatar, getInfoAboutMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getInfoAboutMe);

router.get('/:userId', userIdValidation, getUserById);

router.patch('/me', updateUserInfoValidation, updateUser);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
