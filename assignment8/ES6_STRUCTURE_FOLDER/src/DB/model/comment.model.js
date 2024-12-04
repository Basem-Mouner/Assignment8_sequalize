import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import UserModel from "./user.model.js";
import Posts from "./post.model.js";


class CommentModel extends Model {}

CommentModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "c_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "c_content",
    },
    
  },
  {
    // Other model options go here

    sequelize, // We need to pass the connection instance
    modelName: "Comments", // We need to choose the model name
    timestamps: true,
    createdAt: "C_created_at",
    updatedAt: "C_updated_at",
  }
);



export default CommentModel;
