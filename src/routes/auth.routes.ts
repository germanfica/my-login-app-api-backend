import { Router } from 'express';
import { authenticateLocal, authenticateJwt } from '../auth';
import { validateUserLogin, validateUserSignUp } from '../utils/validators';
import * as AuthController from '../controllers/auth.controller';
import { validationResult } from 'express-validator';

const router = Router();

const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/login', validateUserLogin, handleValidationErrors, authenticateLocal, AuthController.login);
router.post('/signup', validateUserSignUp, handleValidationErrors, AuthController.signup);
router.post('/logout', authenticateJwt, AuthController.logout);

export default router;