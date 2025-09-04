const { Schema, model } = require("mongoose");
const EmpScheme = new Schema(
  {
    emp_id: {
      type: String,
      require: true,
    },
    emp_name: {
      type: String,
      require: true,
    },
    emp_salary: {
      type: String,
      require: true,
    },
    emp_location: {
      type: String,
      require: true,
    },
    emp_email: {
      type: String,
      require: true,
    },
    emp_experience: {
      type: String,
      require: true,
    },
    emp_gender: {
      type: String,
      require: true,
      enum: ["male", "female", "others"],
    },
    emp_designation: {
      type: [""],
      require: true,
    },
    emp_skill: {
      type: String,
      require: true,
    },
    emp_photo: {
      type: [""],
      require: true,
      default:
        "https://www.kindpng.com/picc/m/78-785917_user-login-function-name-avatar-user-icon-hd.png",
    },
    emp_edu: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("emp", EmpScheme);
