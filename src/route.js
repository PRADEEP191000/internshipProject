const express = require('express')
const router = express.Router();

const internController=require('./controllers/internController')
const collegeController=require('./controllers/collegeController')
const validfun = require("./validation")

//CREATE BLOG

router.post("/functionup/colleges", collegeController.createCollege)

//CREATE INTERN

router.post("/functionup/interns", internController.createIntern)


// GET COLLEGE DATrouterA

router.get("/functionup/collegeDetails", collegeController.getCollege)


router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

module.exports = router;