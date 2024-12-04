
import { Router } from 'express';
const router = Router();

import * as userProfileServices from "./service/profile.service.js";

router.post("/signup", userProfileServices.signup);
router.post("/restore", userProfileServices.restoreAccount);      
router.get("/:id", userProfileServices.userProfileById);
router.put("/:id", userProfileServices.userUpdate);
router.get("/by_email", userProfileServices.userByEmail);
router.delete("/:id", userProfileServices.userProfileDelete);
router.delete("/hardDelete/:id", userProfileServices.userProfileHardDelete);
//________________________________
export default router;

