import { Router } from "express";
import * as commentServices from "./service/comment.service.js";
const router = Router();

//_______________________________________________________________________
router.post("/", commentServices.addBulkComment);
router.patch("/:commentId", commentServices.updateContent);
router.post("/find_create", commentServices.findOrCreate);
router.get("/search", commentServices.searchBySpecificWord);
router.get("/newest/:PostId", commentServices.commentForSpecificPost);
router.get("/details/:c_id", commentServices.commentDetails);
//________________________________
export default router;
