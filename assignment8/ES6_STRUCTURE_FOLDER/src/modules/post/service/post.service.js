import UserModel from "../../../DB/model/user.model.js";
import Posts from "../../../DB/model/post.model.js";
import CommentModel from "../../../DB/model/comment.model.js";
import { errorHandling } from "../../../utils/errorHandling.js";
import { sequelize } from "../../../DB/connection.js";




export const addPost = async (req, res, next) => {
  try {
    const { title, content, UserId } = req.body;
    const user = await UserModel.findByPk(UserId);
    if (!user) {
      return res.status(404).json({ message: "In-Valid user id" });
    }
    // const blogs = await Posts.create(req.body);
    //or by new instance and save
    const blogs = new Posts();
    blogs.title = title;
    blogs.content = content;
    blogs.UserId = UserId;
    await blogs.save();

    res.status(200).json({
      message: "Done",
      blogs,
    });
  } catch (error) {
    await errorHandling(error, res);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({
      where: {
        id: postId,
      },
    });
    async function checkAuthorization(post) {
      if (post.UserId !== Number(req.body.tokenId)) { 
        return res.status(401).json({ message: "you are not authorized to delete this post" });
      } else {
        await Posts.destroy({
          where: {
            id: postId,
          },
        });
        return res.status(200).json({ message: "Done SOFT deleted post", post })
      }


    }
    return post
      ? checkAuthorization(post)
      : res.status(404).json({ message: "post not found" });
  } catch (error) {
    await errorHandling(error, res);
  }
};

export const postDetails = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      attributes: ["id", "title"],

      include: [
        {
          model: UserModel,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: CommentModel, // Include comments on the post
          attributes: ["id", "content"],
          include: [
            {
              model: UserModel, // Include the user who created the comment
              attributes: ["id", "firstName", "lastName"], // Select specific fields
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Done",
      posts,
    });
  } catch (error) {
    await errorHandling(error, res);
  }
};

export const countCommentPost = async (req, res, next) => {
  try {
  //  const comments = new CommentModel();

    const posts = await Posts.findAll({
      attributes: [
        "id", // Include post ID
        "title", // Include post title
        [
          // Count the number of comments associated with each post
          sequelize.fn("COUNT", sequelize.col("Comments.PostId")),
          "commentCount",
        ],
      ],

      include: [
        {
          model: CommentModel,
          attributes: [], // We only need the count, not the comment details
        },
        {
          model: UserModel, // Optionally include post author details
          attributes: [
            ["u_id", "id user post"],
            ["u_firstName", "user post firstName"],
            ["u_lastName", "user post lastName"],
          ],
        },
      ],
      group: ["Posts.p_id"], // Group by Post and User to ensure correct counts
    });
    res.status(200).json({
      message: "Done",
      posts,
    });
  } catch (error) {
    await errorHandling(error, res);
  }
};
