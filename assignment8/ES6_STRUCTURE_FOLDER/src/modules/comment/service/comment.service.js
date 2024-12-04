import { Op } from "sequelize";
import CommentModel from "../../../DB/model/comment.model.js";
import Posts from "../../../DB/model/post.model.js";
import UserModel from "../../../DB/model/user.model.js";
import { errorHandling } from "../../../utils/errorHandling.js";
//_______________________________________________________________________

export const addBulkComment = async (req, res, next) => {
  try {
    const commentsData = req.body; // Expecting an array of comments
    if (!Array.isArray(commentsData)) {
      return res
        .status(400)
        .json({ message: "Request body must be an array of comments" });
    }
    const createdComments = await CommentModel.bulkCreate(commentsData,{ validate: true });
    return res.json(createdComments);
    return createdComments
      ? res.status(200).json({ message: "Done", createdComments })
      : res.status(404).json({ message: "in-valid user id" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
export const updateContent = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findOne({
      where: {
        id: commentId,
      },
      // attributes: ["id", "content", "UserId", "PostId",]
    });
    async function checkAuthorization(comment) {
      if (comment.UserId !== Number(req.body.tokenUserId)) {
        return res
          .status(401)
          .json({ message: "you are not authorized to update this comment" });
      } else {
        // Update the comment's content
        comment.content = req.body.content;
        await comment.save({
          validate: true,      
        });
        return res
          .status(200)
          .json({ message: "Done comment updated", comment });
      }
    }
    return comment
      ? checkAuthorization(comment)
      : res.status(404).json({ message: "comment not found" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
export const findOrCreate = async (req, res, next) => {
  try {
    const { UserId, PostId, content } = req.body;

    const comment = await CommentModel.findOrCreate({
      where: {
        UserId,
        PostId,
      },
      paranoid: false, // Include soft-deleted records

      defaults: req.body,
      //or
      // defaults: { UserId, PostId, content },
    });

    return comment[1]
      ? res.status(201).json({ comment: comment[0], created: comment[1] })
      : res.status(409).json({ comment: comment[0], created: comment[1] });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
export const searchBySpecificWord = async (req, res, next) => {
  try {
    const { word } = req.query;

    const comments = await CommentModel.findAndCountAll({
      where: {
        content: { [Op.substring]: [word] },
      },
      // offset: 2, // beginning from id =2
      // limit: 1, // display only (one) the number in limit
    });
    return comments?.count
      ? res.status(201).json({ count: comments.count, comments: comments.rows })
      : res.status(409).json({ message: 'no comment found' });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
export const commentForSpecificPost = async (req, res, next) => {
  try {
    const { PostId } = req.params;
    const post_id = await Posts.findOne({
      where: { id: PostId },
    });
    if (!post_id) {
      return res.status(404).json({ message: 'post id not found' });
    }
    const comments = await CommentModel.findAndCountAll({
      where: { PostId },
      limit: 3, // display only (one) the number in limit
      order: [["C_created_at", "DESC"]], // Order by creation date descending
    });
    return comments?.count
      ? res.status(201).json({  comments: comments.rows })
      : res.status(409).json({ message: "no comment for this post" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
export const commentDetails = async (req, res, next) => {
  try {
    const { c_id } = req.params;
    
    const comment = await CommentModel.findOne({
      where: { c_id },
      attributes: [["c_id",'comment_Id'], "content"],
      include: [
        {
          model: UserModel,
          attributes: [["u_id",'user_Id'], "firstName", "lastName", "email"],
        },
        {
          model: Posts,
          attributes: [["p_id",'post_Id'], "title", "content"],
        },
      ],
    });

   

    return comment
      ? res.status(201).json({ comment })
      : res.status(409).json({ message: "no comment by this id" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//_______________________________________________________________________
