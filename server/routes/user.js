const express = require('express');
const router  = express.Router();
const usercontroller = require('../controller/userController');

router.post('/adduser',usercontroller.add);
router.get('/adduser',usercontroller.addUser);

router.get('/',usercontroller.view);
router.post('/',usercontroller.find);
router.get('/:id',usercontroller.delete);


router.get('/edituser/:id',usercontroller.editUser);
router.post('/edituser/:id',usercontroller.updateUser);

router.get('/viewuser/:id',usercontroller.viewUser);

module.exports = router;