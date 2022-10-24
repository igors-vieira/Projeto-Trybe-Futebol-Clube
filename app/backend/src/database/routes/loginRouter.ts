import { Router } from 'express';
import LoginController from '../controller/LoginController';
import emailPassword from '../middlewares/emailPassword';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import LoginServices from '../services/login.service';

const loginService = new LoginServices();
const loginController = new LoginController(loginService);
const router = Router();

router.get('/login/validate', tokenMiddleware, (req, res) => loginController.getId(req, res));
router.post('/login', emailPassword, (req, res) => loginController.getToken(req, res));

export default router;
