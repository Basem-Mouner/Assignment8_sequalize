


export  function  errorHandling(error, res) {
    if (error?.name == "SequelizeValidationError") {
      const errorDetails = error.errors.map((err) => {
        return { path: err.path, message: err.message };
      });
      return res
        .status(400)
        .json({ message: "validation-error", errorDetails });
  }
  if (error?.name == "SequelizeForeignKeyConstraintError") {
    
    return res
      .status(400)
      .json({ message: "foreign key error check userId or PostId must be valid " });
  }

    return res.status(500).json({message:'fail', error ,errMessage:error.message,stack:error.stack});
}