var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var MultiParser = require('../multiparser');
const { Router } = require('express');
router.use(MultiParser());

const fs = require('fs');
const path = require('path');

// parse application/json
var tables = require('../model/baseTable');

// const utility=require('../utility/utility');
// const moment=require('moment');
// const constants=require('../utility/constants');

// testing stripe keys

function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    return timestamp + random;
}



// Admin side code
router.get('/dashboard', checkUserSession, async function (req, res) {
    let accountDetails = req.session.user_details.role;     
    if(accountDetails == 1){
        res.render('pages/admin/dashboard');
    }else{    
        return res.redirect('/');
    }   
});
router.get('/category-list',checkUserSession, async function (req, res) {
    let accountDetails = req.session.user_details.role;     
    if(accountDetails == 1){
        let [err,categoryList]=await tables.categoryTable.getCategoryList();    
        res.render('pages/admin/category-list',{'category':categoryList});
    }else{    
        return res.redirect('/');
    }  
});
router.get('/add-category',checkUserSession, function (req, res) {
    let accountDetails = req.session.user_details.role;     
    if(accountDetails == 1){
        res.render('pages/admin/add-category');
    }else{    
        return res.redirect('/');
    }    
});
router.post('/add-category-data', async function (req, res) {    
    let category = req.body.category;  
    let content = req.body.content;   

    if (category == "" || category== undefined) {
        return res.json({ 'success': false, 'message': "Please enter category" });
    }  
    if (content == "" || content== undefined) {
        return res.json({ 'success': false, 'message': "Please enter content" });
    }  
    let categoryDetails = [];   
    categoryDetails.push(category); 
    categoryDetails.push(content);  
    //   console.log(courseDetails);return;
    let [err, submitResponse] = await tables.categoryTable.insertCategory(categoryDetails); 
    return res.send({'success': true, 'message': 'Category added Successfully'})
});
router.get('/edit-category/:id', async function (req, res) {   
    let Id = Buffer.from(req.params.id, 'base64').toString();    
    categoryId = Id.split('=');    
    const [err, categoryDetails] = await tables.categoryTable.getCategoryDetails({ 'id': categoryId[1] }); 
    return res.render('pages/admin/edit-category', {'category': categoryDetails[0]});
})
router.post('/edit-category-data', async function (req, res) {  
  
    let category = req.body.category;  
    let content = req.body.content;     
    let id = req.body.id;    

    if (id == "" || id== undefined) {
        return res.json({ 'success': false, 'message': "Invalid request" });
    }  
    if (category == "" || category== undefined) {
        return res.json({ 'success': false, 'message': "Please enter category" });
    }  
    if (content == "" || content== undefined) {
        return res.json({ 'success': false, 'message': "Please enter content" });
    }  

   let [err,submitResponse] = await tables.categoryTable.updateCategory({ 'category': category,'content':content},{'id':id});
    return res.send({'success': true, 'message': 'Category updated Successfully'})
});

router.post('/delete-category', async function (req, res) {   
    let id = req.body.deleteCategory;   
    const [err, updateQuery] = await tables.categoryTable.updateCategory({ 'status': 0 }, { 'id': id })
    return res.send({ 'success': true, 'message': "Deleted Successfully" });
});
router.get('/courses-list', async function (req, res) {
    let accountDetails = req.session.user_details.role;     
    if(accountDetails == 1){
        let [err,courseList]=await tables.courseTable.getCourseList();   
        res.render('pages/admin/courses-list',{'courses':courseList});
    }else{    
        return res.redirect('/');
    }      
});
router.get('/add-course',async function (req, res) {
    let [err,categoryList]=await tables.categoryTable.getCategoryList();    
    res.render('pages/admin/add-course',{'category':categoryList});
});
router.post('/add-course-data', async function (req, res) {  
  
        let course_name = req.body.course_name;  
        let start_date = req.body.start_date; 
        let end_date = req.body.end_date; 
        let start_time = req.body.start_time; 
        let duration = req.body.duration;  
        let lectures = req.body.lectures; 
        let levels = req.body.levels; 
        let enrolled = req.body.enrolled; 
        let video = req.body.video; 
        let overview = req.body.overview; 
        let course_outline = req.body.course_outline; 

        let category = req.body.category; 
        let course_type = req.body.course_type; 
        let language = req.body.language; 
        let location = req.body.location; 

       
       let date = start_date.split("-");
       let year = date[0];
       let month = date[1];

        console.log("files",req.body.files);
        let temPath = req.body.upload_file.path;
        let randomDirectory = getRandomFileName();
        let file = path.join(__dirname,'..','/public/upload-files',randomDirectory);
        console.log("file",file,req.body.upload_file.name);
        /*utility.createDirRecursively(file);*/
        fs.mkdirSync(file);
        var newpath = path.join(file,req.body.upload_file.name);
        fs.rename(temPath,newpath,(err) => console.log(err));
    
        let fileName = path.join("upload-files",randomDirectory,req.body.upload_file.name);

        let courseDetails = [];    

        courseDetails.push(category); 
        courseDetails.push(course_type); 
        courseDetails.push(course_name); 
        courseDetails.push(start_date);  
        courseDetails.push(end_date); 
        courseDetails.push(start_time);   
        courseDetails.push(duration); 
        courseDetails.push(lectures);  
        courseDetails.push(levels); 
        courseDetails.push(enrolled);  
        courseDetails.push(video); 
        courseDetails.push(overview);  
        courseDetails.push(course_outline);    
        courseDetails.push(fileName); 
        courseDetails.push(language); 
        courseDetails.push(location); 
        courseDetails.push(month); 
        courseDetails.push(year); 

        //  console.log(courseDetails);return;
        let [err, submitResponse] = await tables.courseTable.insertCourse(courseDetails); 
        return res.send({'success': true, 'message': 'Course added Successfully'})
});
router.get('/edit-course/:id', async function (req, res) {   
    let Id = Buffer.from(req.params.id, 'base64').toString();    
    courseId = Id.split('=');  
    const [err, courseDetails] = await tables.courseTable.getCourseDetails(courseId[1]); 
    //  console.log(courseDetails[0]['course_type']);return;
    
    let courseType = "";
    if(courseDetails[0]['course_type'] == 1){
      courseType = "Class Rooms";
    }else{
      courseType = "Virtual Classes";
    } 
    let [err1,categoryList]=await tables.categoryTable.getCategoryList();
    return res.render('pages/admin/edit-course', {'course': courseDetails[0],'category':categoryList,courseType});
})
router.post('/edit-course-data', async function (req, res) {  
  
    let course_name = req.body.course_name;  
    let start_date = req.body.start_date; 
    let end_date = req.body.end_date; 
    let start_time = req.body.start_time; 
    let duration = req.body.duration;  
    let lectures = req.body.lectures; 
    let levels = req.body.levels; 
    let enrolled = req.body.enrolled; 
    let video = req.body.video; 
    let overview = req.body.overview; 
    let course_outline = req.body.course_outline; 
    let category = req.body.category; 
    let course_type = req.body.course_type; 
    let language = req.body.language; 
    let location = req.body.location; 
    let id = req.body.id; 

    let date = start_date.split("-");
    let year = date[0];
    let month = date[1];

    console.log("files",req.body.files);
    let temPath = req.body.upload_file.path;
    let randomDirectory = getRandomFileName();
    let file = path.join(__dirname,'..','/public/upload-files',randomDirectory);
    console.log("file",file,req.body.upload_file.name);
    /*utility.createDirRecursively(file);*/
    fs.mkdirSync(file);
    var newpath = path.join(file,req.body.upload_file.name);
    fs.rename(temPath,newpath,(err) => console.log(err));

    let fileName = path.join("upload-files",randomDirectory,req.body.upload_file.name);

    
   let [err,submitResponse] = await tables.courseTable.updateCourse({ 'category':category,'course_type':course_type,'course_name': course_name,'start_date':start_date,'end_date':end_date,'start_time':start_time,'duration':duration,'lectures':lectures,'levels':levels,'enrolled':enrolled,'video':video,'overview':overview,'course_outline':course_outline,'banner':fileName,'language':language,'location':location,'month':month,'year':year},{'id':id});
    return res.send({'success': true, 'message': 'Course updated Successfully'})
});
router.post('/delete-course', async function (req, res) {   
     let id = req.body.deleteCourse; 
     const [err, updateQuery] = await tables.courseTable.updateCourse({ 'status': 0 }, { 'id': id })
     return res.send({ 'success': true, 'message': "Deleted Successfully" });
});
router.get('/registration-list', async function (req, res) {
    let [err,registeredList]=await tables.registerTable.getList();    
    res.render('pages/admin/registration-list',{'list':registeredList});
    // let accountDetails = req.session.user_details.role;     
    // if(accountDetails == 1){
    //     let [err,registeredList]=await tables.registerTable.getList();    
    //     res.render('pages/admin/registration-list',{'list':registeredList});
    // }else{    
    //     return res.redirect('/');
    // }  
    
});
router.post('/delete-registration', async function (req, res) {   
    let id = req.body.deleteId; 
    const [err, updateQuery] = await tables.registerTable.updateData({ 'status': 0 }, { 'id': id })
    return res.send({ 'success': true, 'message': "Deleted Successfully" });
});
function checkUserSession(req, res, next) {
    if (req.session.user_details) {
        if (req.session.user_details.role == 1) {
            next();
        } 
    } else {
        return res.redirect(req.protocol + '://' + req.get('host') + '/login');
        //next();
    }
}

module.exports = router;









