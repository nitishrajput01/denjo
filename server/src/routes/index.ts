import { Router } from "express";
import userRoutes from "../modules/users/user.routes" 

const router = Router();


router.use('/auth', userRoutes);


export default router;