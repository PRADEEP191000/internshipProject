const mongoose = require("mongoose")

function collegeValidation(value) {
    return (Object.keys(college).length > 0)
}

//==================================================internValidation=====================================//

const internValidation = function (intern) {
    return inp.indexOf(intern) !== -1;
};

//=====================================nameValidation=================================================//

const nameValidation = function (name) {

    if (typeof name === 'undefined' || name === null) { return false };
    if (typeof name === 'string' && name.trim().length === 0) { return false };
    return true

};


module.exports = { collegeValidation, internValidation, nameValidation }
