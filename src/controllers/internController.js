// const { default: mongoose } = require('mongoose')
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validfun = require("../validation")
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const mobileRegex =/^(\+\d{1,3}[- ]?)?\d{10}$/
const nameRegex = /^[a-zA-Z_ ]*$/

// ===========================|| CREATE INTERN ||==================

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName} = data;

        if (!data) { return res.status(400).send({ status: false, msg: "Provide Data" }) }
        
        if (!name) {return res.status(400).send({ status: false, msg: "name is required" })}
        if (!email) {return res.status(400).send({ status: false, msg: "email is required" })}
        if (!mobile) {return res.status(400).send({ status: false, msg: "mobile Number missing" })}
        if (!collegeName) {return res.status(400).send({ status: false, msg: "college name missing" })}
        
        if (!validfun.nameValidation(name)) {
            return res.status(400).send({ status: false, msg: "Please enter valid intern name!!" }) };     
        if (!validfun.nameValidation(email)) {
            return res.status(400).send({ status: false, msg: "Please enter Email must be string!!" }) };
        if (!validfun.nameValidation(mobile)) {
            return res.status(400).send({ status: false, msg: "Please enter Valid mobile!!" }) };
        if (!validfun.nameValidation(collegeName)) {
            return res.status(400).send({ status: false, msg: "Please enter collegeName!!" }) };


        if (!nameRegex.test(name)) {return res.status(400).send({ status: false, msg: "Invalid name" })}
        if (!emailRegex.test(email)) {return res.status(400).send({ status: false, msg: "Invalid emailId" })}
        if (!mobileRegex.test(mobile)) {return res.status(400).send({ status: false,
        msg: "Invalid mobile number .it must be 10 digit Number & it should be a indian mobile no."})}
        if (!nameRegex.test(collegeName)) {return res.status(400).send({ status: false, msg: "Invalid collegeName" })}

        const availablelData=await internModel.find({$or:[{email:email},{mobile:mobile}]})
        if(availablelData.length>0){return res.status(409).send({status:false,msg:"Email Or Mobile already exists"})}
        
        
        let object = {}
        if (name !== null) { object.name = name }
        if (email !== null) { object.email = email }
        if (mobile !== null) { object.mobile = mobile }

        let collegeId = await collegeModel.findOne({name:collegeName})
        if (!collegeId) {res.status(404).send({ status: false, msg: " college is not present" })}
        if (collegeId !== null) { object.collegeId = collegeId._id }

        let savedData = await internModel.create(object);
        res.status(201).send({ status: true, msg: savedData })

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}



module.exports.createIntern = createIntern

