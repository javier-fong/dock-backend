const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');

router.get('/users/:email', UserController.getUsers);
router.put('/member/add/:id', UserController.addMember);
router.put('/member/edit/:id', UserController.editMemberName);
router.delete('/member/delete/:id/:members', UserController.deleteMember);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user', UserController.getUser);

module.exports = router;