import {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { registerCandidate , registerCompany , logInCandidate , logInCompany , logOutCandidate , logOutCompany } from "../controller/auth.controller";

const router = Router();

//signup routes
router.post("/candidate/signup" , registerCandidate);
router.post("/company/signup" , registerCompany);

//signin routes
router.post("/candidate/signin" , logInCandidate);
router.post("/company/signin" , logInCompany);

//logout routes
router.post("/candidate/logout" , logOutCandidate);
router.post("/company/logout" , logOutCompany);

// //get user routes
// router.



export default router;