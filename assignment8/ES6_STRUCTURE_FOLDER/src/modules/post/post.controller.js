import { Router } from "express";
const router = Router();

import * as postServices from "./service/post.service.js";

router.post("/", postServices.addPost);
router.delete("/:postId", postServices.deletePost);
router.get("/details", postServices.postDetails);
router.get("/comment_counts", postServices.countCommentPost);


//________________________________
export default router;
