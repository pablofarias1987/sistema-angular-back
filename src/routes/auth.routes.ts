import {Router} from 'express'
import {
  signIn2,
  signUp,
} from '../controllers/user.controller'

const router = Router();

router.post('/signup', signUp);
router.post('/signin2', signIn2);

export default router;