
import userController from'./modules/user/user.controller.js';
import postController from './modules/post/post.controller.js';
import commentController from './modules/comment/comment.controller.js';
import { checkDBConnection, SyncDB } from './DB/connection.js';
import UserModel from './DB/model/user.model.js';

const bootstrap = (app, express) => {
  //_______DB check connection and mack synchronization___________
  checkDBConnection();
  SyncDB();
  //______________________________________________________________
  //_____________middle ware___________________
  app.use(express.json());//convert buffer data
  //___________app routing_____________________
  app.get("/", 
    async (req, res, next) => {
      await UserModel.findAll({}); 
      return res.status(200).json({ message: "Hello in Assignment 8 Squalize SQL & Structure express ES6" })
    });
  //_____________sup express routing____________
  app.use('/user', userController);
  app.use("/post", postController);
  app.use("/comments", commentController);
  //______________________________________________
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "page not found" });
  });
  //________________________________________________
};

export default bootstrap




