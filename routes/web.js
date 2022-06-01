

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var MultiParser = require('../multiparser');
const { Router } = require('express');
router.use(MultiParser());
var tables = require('../model/baseTable');

const headerData = async function(req,res,next){
    let [err,categoryList]=await tables.categoryTable.getCategoryList();   
    req.app.locals.category = categoryList;
    next();
}

// home page
router.get('/',headerData, function (req, res) {
    res.render('pages/');
});

// about page
router.get('/about',headerData, function (req, res) {
    res.render('pages/about');
});

router.get('/our-team',headerData, function (req, res) {
    res.render('pages/our-team');
});
router.get('/testimonails',headerData, function (req, res) {
    res.render('pages/testimonails');
});
router.get('/faqs',headerData, function (req, res) {
    res.render('pages/faqs');
});

// training page
router.get('/training-method',headerData, function (req, res) {   
    res.render('pages/training-method');
});

//course page
router.get('/courses/:id',headerData,async function (req, res) {
    let Id = Buffer.from(req.params.id, 'base64').toString();    
    category = Id.split('='); 
    let [err,courseList]=await tables.courseTable.getCourseListByCategory(category[1]);  
    // console.log(courseList);return;
    let [err1,courseType]=await tables.courseTable.getCourseTypeList(); 
    let [err2,courseLocation]=await tables.courseTable.getCourseLocationList();  
    let [err4,courseMonth]=await tables.courseTable.getCourseMonthList();  
    let [err3,courseYear]=await tables.courseTable.getCourseYearsList();  
    res.render('pages/courses',{'courses':courseList,courseType,courseLocation,courseYear,courseMonth});
});
router.get('/course-details/:id',headerData, async function (req, res) {
    let Id = Buffer.from(req.params.id, 'base64').toString();    
    courseId = Id.split('='); 
    const [err, courseDetails] = await tables.courseTable.getCourseDetails(courseId[1]);  

    const [err1, virtualCourseDetails] = await tables.courseTable.getVirtualCourseDetailsByCategory(courseDetails[0]['category']);  
    //  console.log(virtualCourseDetails);return;
    return res.render('pages/course-details', {'course': courseDetails[0],virtualCourseDetails});
});
router.post('/filter-data',headerData, async function (req, res) {
    let course_type = req.body.course_type;  
    let location = req.body.location;  
    let language = req.body.language;  
    let month = req.body.month;  
    let year = req.body.year;  
    let category = req.body.category;  
        
    const [err, filterDetails] = await tables.courseTable.getFilterDetails(course_type,location,language,month,year,category);  
  
    res.json({ success: true, 'filter': filterDetails})  
});


router.post('/course-name-by-category',headerData, async function (req, res) {
    let category = req.body.category; 
    const [err, courseDetails] = await tables.courseTable.getCourseNameDetails(category);    
    res.json({ success: true, 'course': courseDetails})  
});
router.post('/dates-by-course_name',headerData, async function (req, res) {
    let course_name = req.body.course_name; 
    const [err, datesDetails] = await tables.courseTable.getAvailableDates(course_name);    
    console.log(datesDetails);
    res.json({ success: true, 'dates': datesDetails})  
});



// services
router.get('/services',headerData, function (req, res) {
    res.render('pages/services');
});

// association single 
router.get('/association',headerData, function (req, res) {
    res.render('pages/association');
});

//cities
router.get('/cities',headerData, function (req, res) {
    res.render('pages/cities');
});

//classes
router.get('/virtual-learning',headerData, function (req, res) {
    res.render('pages/virtual-learning');
});
router.get('/online-learning',headerData, function (req, res) {
    res.render('pages/online-learning');
});

// contact
router.get('/contact-us',headerData, function (req, res) {
    res.render('pages/contact-us');
});
//signup
router.get('/registration',async function (req, res) {
    let [err,categoryList]=await tables.categoryTable.getCategoryList(); 
    let [err1,courseName]=await tables.courseTable.getCourseNameList(); 
    //  console.log(courseName);return;
    res.render('pages/registration',{'category':categoryList,'course_name':courseName});
});
router.post('/save-register', async function (req, res) {  
    let type = req.body.type; 
    let class_type = req.body.class_type;  
    let category = req.body.category; 
    let course_name = req.body.course_name; 
    let available_date = req.body.available_date; 
    let email = req.body.email;  
    let first_name = req.body.first_name; 
    let last_name = req.body.last_name; 
    let designation = req.body.designation; 
    let mobile = req.body.mobile; 
    let company = req.body.company; 
    let address = req.body.address; 
    let box = req.body.box; 
    let city = req.body.city; 
    let country = req.body.country; 
    
    let registrationDetails = [];    
    let personalInfo = [];

    registrationDetails.push(type); 
    registrationDetails.push(class_type); 
    registrationDetails.push(category); 
    registrationDetails.push(course_name); 
    registrationDetails.push(available_date);  
    registrationDetails.push(email); 
    registrationDetails.push(first_name);   
    registrationDetails.push(last_name); 
    registrationDetails.push(designation);  
    registrationDetails.push(mobile); 
    registrationDetails.push(company);  
    registrationDetails.push(address); 
    registrationDetails.push(box);  
    registrationDetails.push(city);    
    registrationDetails.push(country); 

    let [err, submitResponse] = await tables.registerTable.saveRegister(registrationDetails); 
    // console.log(submitResponse.insertId);return;
    if(type==1){
        let reg_id = submitResponse.insertId;
        let participants = req.body.participantsDetails;  
        const data = JSON.parse(participants);
        let personalInfo = []; 
        for (let i = 0; i < data.length; i++) {
            personalInfo.push([reg_id,data[i].firstname,data[i].lastname,data[i].designation,data[i].email])
        }
        let [err1, response] = await tables.participantTable.saveData(personalInfo); 
    }

    return res.send({'success': true, 'message': 'Registered Successfully'})
});
// login
router.get('/login',headerData, function (req, res) {
    res.render('pages/login');
});

router.post('/verfiy-login', async function (req, res) {    
    let email = req.body.email;
    let password = req.body.password;      
    if (email == "") {
        return res.send({ 'success': false, 'message': "Please Enter Email" });
    }
    if (password == "") {
        return res.send({ 'success': false, 'message': "Please Enter Password" });
    }   
    const [err, checkUser] = await tables.usersTable.checkUserLogin(email, password);
  
    console.log(err, "err")
    if (err || checkUser.length === 0) {
        return res.send({ 'success': false, 'message': err || 'Invalid Login Details' });
    }       
    session=req.session;
    session.user_details=checkUser;  
    return res.send({ 'success': true, 'message': 'success', 'details': checkUser });
});

//signup
router.get('/signup', function (req, res) {
    res.render('pages/signup');
});

router.get('/logout', async function (req, res) {   
  
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
    });
});
function checkUserSession(req, res, next) {
    if (req.session.user_details) {
       if (req.session.user_details.role == 1) {
            return res.redirect(req.protocol + '://' + req.get('host') + '/admin/category');
        } 
    } else {
        next();
    }
}

router.get('/eng',headerData, function (req, res) {
    res.render('pages/eng');
});
router.get('/fadi',headerData, function (req, res) {
    res.render('pages/fadi');
});
router.get('/fouad',headerData, function (req, res) {
    res.render('pages/fouad');
});
router.get('/gaby',headerData, function (req, res) {
    res.render('pages/gaby');
});
router.get('/georges',headerData, function (req, res) {
    res.render('pages/georges');
});
router.get('/ghena',headerData, function (req, res) {
    res.render('pages/ghena');
});
router.get('/jessy',headerData, function (req, res) {
    res.render('pages/jessy');
});
router.get('/marwan',headerData, function (req, res) {
    res.render('pages/marwan');
});
router.get('/mondheer',headerData, function (req, res) {
    res.render('pages/mondheer');
});
router.get('/nada-salem',headerData, function (req, res) {
    res.render('pages/nada-salem');
});
router.get('/nardine',headerData, function (req, res) {
    res.render('pages/nardine');
});
router.get('/philip',headerData, function (req, res) {
    res.render('pages/philip');
});
router.get('/racha',headerData, function (req, res) {
    res.render('pages/racha');
});
router.get('/rima',headerData, function (req, res) {
    res.render('pages/rima');
});
router.get('/roland',headerData, function (req, res) {
    res.render('pages/roland');
});
router.get('/samer',headerData, function (req, res) {
    res.render('pages/samer');
});
router.get('/soha',headerData, function (req, res) {
    res.render('pages/soha');
});
router.get('/souad',headerData, function (req, res) {
    res.render('pages/souad');
});
router.get('/wael',headerData, function (req, res) {
    res.render('pages/wael');
});
router.get('/zaher',headerData, function (req, res) {
    res.render('pages/zaher');
});



//export this router to use in our index.js
module.exports = router;