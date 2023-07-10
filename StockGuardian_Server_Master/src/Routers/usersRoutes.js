const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, deleteUserById, updateUserById, loginUser } = require('../Controllers/usersController');
const { registerUser, loginUserService } = require('../Services/registerUserService');
const { isValidObjectId } = require('mongoose');
const validateUser = require('../validateUserHandler');
const validateAdmin = require('../validateAdminHandler');

router.param('id', (req, res, next, id) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            res.status(500);
            throw new Error('Entered id is Invalid');
        }
        next();
    } catch (err) {
        console.log('In param method error')
        throw new Error(err.message);
    }
});

router.route('/register').post(registerUser);
router.route('/login').post(loginUserService);

router.use(validateUser);

router.route('/').get(validateAdmin ,getAllUsers);

router.route('/:id').get(getUserById).delete(deleteUserById).patch(updateUserById);

module.exports = router;