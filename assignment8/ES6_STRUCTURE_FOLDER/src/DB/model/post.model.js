import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import UserModel from "./user.model.js";
import CommentModel from "./comment.model.js";




class Posts extends Model {
}

Posts.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "p_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "p_title",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "p_content",
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Users", // Reference to Users table
    //     key: "id",
    //   },
    // },
  },
  {
    // Other model options go here

    sequelize, // We need to pass the connection instance
    modelName: "Posts", // We need to choose the model name
    timestamps: true,
    createdAt: "P_created_at",
    updatedAt: "P_updated_at",
    paranoid: true, // Enable soft deletes
  }
);


export default Posts;
