var db=require('../database');
var tableName='users';
 var utility=require("../utility/utility");
module.exports=
    {
        checkUser: function (condition) {
            return  new Promise((resolve )=>{
            db.connection.getConnection(function (err, connection) {
                if (err) {
                    return resolve([err, null]);
                }
                let select='';
                let where=[];
                // for(const field in condition){
                //     select =select+'  '+field +' = ? and ';
                //     where.push(condition[field]);
                // }
                // select = utility.removeLastAnd(select);
                let update='select * from users where '+Object.keys(condition).join(' =? ,');
                let conditonKeyValue=Object.values(condition);

                connection.query("select * from users where "+select,conditonKeyValue, function (err, response){
                    connection.release();
                    resolve([err, response]);
                });

            });
            })
        },
        agentListForSite: function (siteId,userId) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        return resolve([err, null]);
                    }
                    connection.query("select * from users where site_id= ? and user_id != ?",[siteId,userId],function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });
                });
            })
        },
        checkUserLogin: function (email,password) {
            return  new Promise((resolve )=>{
            db.connection.getConnection(function (err, connection) {
                if (err) {
                    return resolve([err, null]);
                }
                let select='';
                let where=[];
                connection.query("select * from users where email=?",email,function (err, response){
                    connection.release();
                       if(response && response.length){ 
                            let decryptPassword=utility.decrypt(response[0].password,response[0].hash);                                              
                            if(password===decryptPassword){
                                resolve([err, response[0]]);
                            }else{
                                resolve(["Invalid Password", null]);
                            }
                       }else{
                           resolve([err, response]);
                       }

                });

            });
            })
        },
        getCustomers: function () {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];

                    connection.query("select p.start_date,p.end_date,u.user_id,u.name,u.created_at,u.mobile,u.email,a.account_id,a.company_name,a.country_name,a.plan_id from users as u inner join accounts as a on a.account_id=u.account_id left join payments as p on p.account_id =a.account_id and p.status=1 where u.role=1 and u.status=1  group by u.user_id order by u.created_at desc", function (err, response){
                        connection.release();
                        console.log(err,"account Table")
                        resolve([err, response]);
                    });

                });
            })
        },
        getEmployeesList: function (accountId) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];

                    connection.query("select u.user_id,u.name,u.created_at,u.mobile,u.email,s.site_name,a.account_id,a.company_name,a.country_name,a.plan_id from users as u inner join accounts as a on a.account_id=u.account_id left join sites as s on s.site_id=u.site_id where u.role=2 and u.status=1 and a.account_id = ? order by u.created_at desc",accountId, function (err, response){
                        connection.release();
                        console.log(err,"employesss Table")
                        resolve([err, response]);
                    });

                });
            })
        },
        getUserDetails: function (condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];
                    if(condition.user_id){
                        select =' user_id = ?'
                        where.push(condition.user_id);
                    }
                    if(condition.mobile){
                        select =' mobile = ?'
                        where.push(condition.mobile);
                    }
                    connection.query("select user_id,jid,name,email,mobile,site_id,account_id from users where "+select,where, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },        getCustomerDetails: function (userId) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];

                    connection.query("select u.user_id,u.name,u.created_at,u.mobile,u.email,a.account_id,a.company_name,a.country_name,a.plan_id from users as u inner join accounts as a on a.account_id=u.account_id where u.role=1 and u.status=1 and a.status=1 and u.user_id = ? order by u.created_at desc",userId, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getEmployeeDetails: function (condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];
                    if(condition.user_id){
                        select =' user_id = ?'
                        where.push(condition.user_id);
                    }
                    if(condition.mobile){
                        select =' mobile = ?'
                        where.push(condition.mobile);
                    }
                    connection.query("select user_id,name,email,mobile,site_id from users where "+select,where, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        insertUser: function (values) {     
                   
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                  
                    if (err) {
                        resolve([err, null]);
                    }
                    // values.push(0);
                    // values.push(new Date());
                    // values.push(new Date());

                    console.log(values);
                    connection.query("insert into user (name,email,mobile,password) values (?,?,?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                        resolve([err, response]);
                    });

                });
            })
        },
        insertEmployee: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    values.push('');
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into users (name,email,mobile,role,account_id,password,hash,status,site_id,otp,created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                        resolve([err, response]);
                    });

                });
            })
        },updateUser: function (updateQueryValue,condition){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection){
                    if (err) {
                        resolve([err, null]);
                    }
                    let update='update users set '+Object.keys(updateQueryValue).join(' =? ,') +' = ? where '+Object.keys(condition).join(' = ?  and ')+' = ?';
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
        }

    };


