import { Router } from "express";
import * as AS from "./auth.service.js";

const router = Router();
router.post("/signup", AS.signup);
router.post("/signin", AS.signin);

export default router;
