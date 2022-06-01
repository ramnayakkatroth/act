var db=require('../database');
var tableName='course';
// var utility=require("../utility/utility");
module.exports=
    {
        insertCourse: function (values) {    
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {                  
                    if (err) {
                        resolve([err, null]);
                    }
                    console.log(values);
                    connection.query("insert into course (category,course_type,course_name,start_date,end_date,start_time,duration,lectures,levels,enrolled,video,overview,course_outline,banner,language,location,month,year) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                        resolve([err, response]);
                    });

                });
            })
        },
        getCourseList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT course.*,category.category as course_category FROM course LEFT JOIN category ON course.category = category.id  WHERE course.status = 1 ORDER BY id DESC", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseDetails: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select course.*,category.category as course_category from course LEFT JOIN category ON course.category = category.id where course.id=" +condition, function (err, response) {
                        // console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getCourseListByCategory: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select course.*,category.category as course_category from course LEFT JOIN category ON course.category = category.id where course.category=" +condition, function (err, response) {
                        //  console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getVirtualCourseDetailsByCategory: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select course.*,category.category as course_category from course LEFT JOIN category ON course.category = category.id where course.category=" +condition+" and course.course_type="+'"2"' , function (err, response) {
                        //   console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getFilterDetails: function (course_type,location,language,month,year,category) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select course.*,category.category as course_category from course LEFT JOIN category ON course.category = category.id where course.course_type="+' "'+ course_type+'" or course.location="'+ location+'" or course.language="'+ language+'" or course.month="'+ month+'" or course.year="'+ year+'" and course.category="'+ category +'" ', function (err, response) {
                           console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getCourseNameDetails: function (conditionr) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select * from course where category="+conditionr , function (err, response) {
                        //    console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getAvailableDates: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select * from course where course_name="+' "'+ condition+'"'  , function (err, response) {
                            console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        

        updateCourse: function (updateQueryValue,condition){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection){
                    if (err) {
                        resolve([err, null]);
                    }                  
                    let update='update course set '+Object.keys(updateQueryValue).join(' =? ,') +' = ? where '+Object.keys(condition).join(' = ?  and ')+' = ?';
                    let updateKeyValues=Object.values(updateQueryValue);
                    let conditonKeyValue=Object.values(condition);
                    let updateValues=[...updateKeyValues,...conditonKeyValue];
                    connection.query(update,updateValues, function (err, response){
                        connection.release();
                          console.log(err);
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseTypeList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT course_type FROM course WHERE status = 1 GROUP BY course_type", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseNameList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT course_name FROM course WHERE status = 1 GROUP BY course_name", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseLocationList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT location FROM course WHERE status = 1 GROUP BY location", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseYearsList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT year FROM course WHERE status = 1 GROUP BY year", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },
        getCourseMonthList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT month FROM course WHERE status = 1 GROUP BY month", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });
                });
            })
        },

        

    };


