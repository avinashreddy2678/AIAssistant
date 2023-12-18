import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  imgcredits: {
    type: Number,
    default: 0,
  },
  chatcredits: {
    type: Number,
    default: 0,
  },
  messages:{
    type:[{
      text:String,
      label:String
    }]
  },
  img:{
    type:[{
      text:String,
      label:String
    }]
  }
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
