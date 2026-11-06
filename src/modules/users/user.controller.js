import { Router } from "express";
import * as US from "./user.service.js";
import { auth } from "../../middleware/auth.js";

const router = Router();
router.get("/profile", auth, US.getProfile);
router.put("/profile", auth, US.updateProfile);
router.delete("/profile", auth, US.deleteProfile);

export default router;
