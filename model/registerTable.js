var db=require('../database');
var tableName='registration';
// var utility=require("../utility/utility");
module.exports=
    {
        saveRegister: function (values) {    
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {                  
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("insert into registration (registration_type,class_type,category,course_name,available_dates,email,first_name,last_name,designation,mobile,company,address,post_box,city,country) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                           console.log(response.insertId);
                        resolve([err, response]);
                    });
                });
            })
        },
        getList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    } 
                    connection.query("SELECT registration.*,category.category as category_name FROM registration LEFT JOIN category ON registration.category = category.id WHERE registration.status = 1 ORDER BY id DESC", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });

                });
            })
        },
        updateData: function (updateQueryValue,condition){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection){
                    if (err) {
                        resolve([err, null]);
                    }                  
                    let update='update registration set '+Object.keys(updateQueryValue).join(' =? ,') +' = ? where '+Object.keys(condition).join(' = ?  and ')+' = ?';
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

    };


