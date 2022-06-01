var db=require('../database');
var tableName='category';
// var utility=require("../utility/utility");
module.exports=
    {
        insertCategory: function (values) {    
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {                  
                    if (err) {
                        resolve([err, null]);
                    }
                    console.log(values);
                    connection.query("insert into category (category,content) values (?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                        resolve([err, response]);
                    });
                });
            })
        },
        getCategoryList: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }                   
                    connection.query("SELECT * FROM category WHERE status = 1 ORDER BY id DESC", function (err, response){
                        connection.release();
                        //  console.log(err,"employesss Table")
                        resolve([err, response]);
                    });

                });
            })
        },
        getCategoryDetails: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select * from category where " + Object.keys(condition).join(' =? and ') + " =? ", Object.values(condition), function (err, response) {
                        //console.log(err, "err", this.sql);
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getFilterDetails: function (condition) {
            return new Promise((resolve) => {
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select * from course where course_name="+"'"+condition+"'", function (err, response) {
                        // console.log(err, "err", this.sql);return;
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },

        updateCategory: function (updateQueryValue,condition){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection){
                    if (err) {
                        resolve([err, null]);
                    }                  
                    let update='update category set '+Object.keys(updateQueryValue).join(' =? ,') +' = ? where '+Object.keys(condition).join(' = ?  and ')+' = ?';
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


