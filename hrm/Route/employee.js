//router level middleware

const { Router } = require("express");
const router = Router();
const EMPLOYEE = require("./../Model/employee");
const multer = require("multer");
const { ensureAuthenticated } = require("../helper/auth_helper");

//load multer middleware
let { storage } = require("../middleware/multer");

const upload = multer({ storage });

//Get method
router.get("/home", (req, res) => {
  res.render("../views/home", { title: "Home Page" });
});

//Fetch data
router.get("/all-emp", async (req, res) => {
  let payload = await EMPLOYEE.find({}).lean();
  res.render("../views/home", { payload });
});

router.get("/create-emp", (req, res) => {
  res.render("../views/employee/create-emp", { title: "Create employee" });
});

router.get("/:id", async (req, res) => {
  let payload = await EMPLOYEE.findOne({
    _id: req.params.id,
  }).lean();
  res.render("../views/employee/employeeProfile", {
    payload,
    main_id: req.params.id,
  });
});

router.get("/edit-emp/:id", ensureAuthenticated, async (req, res) => {
  let editPayload = await EMPLOYEE.findOne({ _id: req.params.id }).lean();
  res.render("../views/employee/editEmp", { editPayload });
});

router.delete("/delete-emp/:id", async (req, res) => {
  console.log("delete " + req.params.id);
  await EMPLOYEE.deleteOne({ _id: req.params.id });
  // req.flash("SUCCESS_MESSAGE", "successfully employee deleted");
  res.redirect("/employee/home", 302, {});
});

// router.delete("/delete-emp/:id", async (req, res) => {
//   await EMPLOYEE_SCHEMA.deleteOne({ _id: req.params.id });
//   res.redirect("/employee/home", 302, {});
// });

router.post("/create-emp", upload.single("emp_photo"), async (req, res) => {
  let payload = {
    emp_photo: req.file,
    emp_id: req.body.emp_id,
    emp_name: req.body.emp_name,
    emp_salary: req.body.emp_salary,
    emp_location: req.body.emp_location,
    emp_email: req.body.emp_email,
    emp_experience: req.body.emp_experience,
    emp_gender: req.body.emp_gender,
    emp_designation: req.body.emp_designation,
    emp_skill: req.body.emp_skill,
    emp_edu: req.body.emp_edu,
  };
  let body = await EMPLOYEE.create(payload);
  res.redirect("/employee/home", 302, { body });
});

//Get method end

// Put request start
router.put("/edit-emp/:id", upload.single("emp_photo"), (req, res) => {
  console.log("PUT " + req.file);
  EMPLOYEE.findOne({ _id: req.params.id })
    .then((editEmp) => {
      (editEmp.emp_photo = req.file),
        (editEmp.emp_name = req.body.emp_name),
        (editEmp.emp_id = req.body.emp_id),
        (editEmp.emp_salary = req.body.emp_salary),
        (editEmp.emp_location = req.body.emp_location),
        (editEmp.emp_email = req.body.emp_email),
        (editEmp.emp_experience = req.body.emp_experience),
        (editEmp.emp_designation = req.body.emp_designation),
        (editEmp.emp_edu = req.body.emp_edu);

      editEmp.save().then(() => {
        res.redirect("/employee/home", 302, {});
      });
    })
    .catch((err) => console.log(err));
});
// Put request end

// Http put request method creates a new resources or replace a representation of the target resources with the request payoad.

module.exports = router;
