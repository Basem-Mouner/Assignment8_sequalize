import { DataTypes, Op, where } from "sequelize";
import { sequelize } from "../connection.js";
import Posts from "./post.model.js";
import CommentModel from "./comment.model.js";

const UserModel = sequelize.define(
  "Users",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER, // INTEGER
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "u_id",
    },
    firstName: {
      type: DataTypes.STRING, //STRING--> VARCHAR(255) STRING(200)--> VARCHAR(200)
      allowNull: false,
      field: "u_firstName",
      validate: {
        len: [2, 10],
        notEmpty: true,
        //custom validation
        checkFirstName() {
          if (this.firstName.toLowerCase() === "admin") {
            throw new Error("First name cannot be admin");
          }
        },
      },
      get() {
        return this.getDataValue("firstName")?.toUpperCase();
      },
    },
    lastName: {
      type: DataTypes.STRING(200),
      // allowNull defaults to true
      field: "u_lastName",
    },
    userName: {
      type: DataTypes.VIRTUAL, //send by front end but not exist in DB

      // set(value) {
      //   this.setDataValue("firstName", value.split(" ")[0]);
      //   this.setDataValue("lastName", value.split(" ")[1]);
      // },
     
      get() {
        return (
          this.getDataValue("firstName") + " " + this.getDataValue("lastName")
        );
      },
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
      defaultValue: "user",
      field: "u_role",
    },
    DOB: {
      type: DataTypes.DATE,
      field: "u_DOB",
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      field: "u_email",
      //built in validate
      validate: {
        isEmail: true, // Built-in validation to ensure correct email format
      },
      set(value) {
        this.setDataValue("email", value.trim());
      },
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "u_password",
      validate: {
        checkPasswordLength() {
          const pass = String(this.getDataValue("password"));
          if (pass.length < 6) {
            throw new Error("Password must be greater than 6 characters");
          }
        },
      },
    },
  },
  {
    // Other model options go here

    timestamps: true, // adds createdAt and updatedAt fields automatically
    createdAt: "u_created_at",
    updatedAt: "u_updated_at",
    paranoid: true, // here we operate soft delete in my DB which created  deletedAt
    // validate: {
    //   checkPasswordLength() {
    //     const pass = String(this.getDataValue("password"));
    //     if (pass.length < 6) {
    //       throw new Error("Password must be greater than 6 characters");
    //     }
    //   },
    // },
  }
);
// UserModel.hasMany(Posts, {
//   foreignKey: "UserId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// Posts.belongsTo(UserModel, {
//   foreignKey: "UserId",
// });

// Posts.hasMany(CommentModel, {
//   foreignKey: "PostId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// CommentModel.belongsTo(Posts, { foreignKey: "PostId" });


// UserModel.hasMany(CommentModel, {
//   foreignKey: "UserId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// CommentModel.belongsTo(UserModel, {
//   foreignKey: "UserId",
// });



Posts.belongsTo(UserModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
CommentModel.belongsTo(Posts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
CommentModel.belongsTo(UserModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
UserModel.hasMany(CommentModel);
UserModel.hasMany(Posts);
Posts.hasMany(CommentModel);


export default UserModel;
