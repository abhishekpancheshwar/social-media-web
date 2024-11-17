const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');
const { deleteUser } = require('../controllers/userController');


router.get('/', (req, res) => res.send('User route works!'));
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete:id', auth, deleteUser)

module.exports = router;
