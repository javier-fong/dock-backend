const express = require('express');
const router = express.Router();

const PhotoJournalController = require('../controllers/photoJournal-controller');

router.post('/journalpost/create', PhotoJournalController.createJournalPost);
router.get('/journalposts/:email', PhotoJournalController.getJournalPosts);
router.get('/onejournalpost/:email', PhotoJournalController.getThreeJournalPost);
router.put('/journalpost/edit/:id', PhotoJournalController.editJournalPost);
router.delete('/journalpost/delete/:id', PhotoJournalController.deleteJournalPost);

module.exports = router;