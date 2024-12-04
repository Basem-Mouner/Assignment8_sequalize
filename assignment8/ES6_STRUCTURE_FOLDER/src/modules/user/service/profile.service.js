import UserModel from "../../../DB/model/user.model.js";
import {errorHandling} from "../../../utils/errorHandling.js";
import CommentModel from "../../../DB/model/comment.model.js";
import Posts from "../../../DB/model/post.model.js";

//______________________________________________________________

export const signup = async (req, res, next) => {
  try {
    const {email} = req.body;

    const user = await UserModel.findOrCreate({
      where: {
        email,
      },
      defaults: req.body,
    });
    // const user = UserModel.build(req.body);
    // await user.save({validate:true})
    

    return user[1]
      ? res.status(201).json({ message: "Done signup", user })
      : res.status(409).json({ message: "user already exist" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//______________________________________________________________

// //operate paranoid:false to restore account
export const restoreAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({
      where: {
        email,
      },
      paranoid: false, // Include soft-deleted records هنا بفعل كل اليوزر حتي الممسوحين  
    });
  
    async function restoreUSER(USER) {
      await USER.restore();
      return res.status(200).json({
        message: "RE-Store your account NOTE THAT your account are deleted before",
        user,
      });
    }

    return user?.deletedAt
      ? restoreUSER(user)
      : res.status(409).json({ message: "user may already exist or not signup before" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//______________________________________________________________

export const userProfileById = async(req, res, next) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes:{ exclude: ["role"] },
      include: [
        {
          model: Posts,
          // attributes: { exclude: ["UserId"] },
        },
      ],
    });
    return user
      ? res.status(200).json({ message: "Done", user })
      : res.status(404).json({ message: "in-valid user id" });
    
  } catch (error) {
    await errorHandling(error,res)
  }
};
//______________________________________________________________
export const userUpdate = async (req, res, next) => {
  try {
    const user = await UserModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return user[0]
      ? res.status(200).json({ message: "Done updated", user })
      : res.status(404).json({ message: "in-valid user id" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//______________________________________________________________

export const userByEmail = async(req, res, next) => {
  try {
    const user = await UserModel.findOne(
      {
        where: {
          email: req.query.email,
        },
        attributes: { exclude: ["deletedAt"] },
        // include: [
        //   {
        //     model: Posts,
        //     attributes: { exclude: ["UserId"] },
        //   },
        // ],
      },

      {
        // include: [
        //   {
        //     model: Posts,
        //     attributes: { exclude: ["UserId"] },
        //   },
        // ],
      }
    );
   
    return user
      ? res.status(200).json({ message: "Done", user })
      : res.status(404).json({ message: " user email not found" });
    
  } catch (error) {
    await errorHandling(error,res)
  }
};
//______________________________________________________________
// //operate paranoid:true to soft delete in userModel option
export const userProfileDelete = async (req, res, next) => {
  try {
    const user = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return user
      ? res.status(200).json({ message: "Done SOFT deleted ", user })
      : res.status(404).json({ message: "in-valid user id"});
  } catch (error) {
    await errorHandling(error, res);
  }
};
//______________________________________________________________
// //BY ADDING FORCE TRUE WE MAKE HARD DELETE
export const userProfileHardDelete = async (req, res, next) => {
  try {
    const user = await UserModel.destroy({
      where: {
        id: req.params.id,
      },
      force: true, //////////HARD DELETED
    });
    return user
      ? res.status(200).json({ message: "Done HARD deleted", user })
      : res.status(404).json({ message: "in-valid user id" });
  } catch (error) {
    await errorHandling(error, res);
  }
};
//______________________________________________________________

