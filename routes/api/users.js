const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  const { body: { email, password } } = req;

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const user = {
    email,
    password
  };

  const finalUser = new Users(user);

  finalUser.setPassword(password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { email, password } } = req;
  
  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(400)
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      
      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;