const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');

router.get('/users/:email', UserController.getUsers);
router.put('/member/add/:id', UserController.addMembers);
router.put('/member/edit/:id', UserController.editMemberName);
router.delete('/member/delete/:id/:members', UserController.deleteMember);

module.exports = router;