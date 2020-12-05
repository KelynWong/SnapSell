// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');

var userDB = {
    getAllUsers : function (callback) {
        var sql = 'select * from user';
        db.query(sql, function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    addUser : function (username, pic, callback) {
        var sql = 'insert into user (username, profile_pic_url) values (?,?)';
        db.query(sql, [username, pic], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    findByID : function (id, callback) {
        var sql = 'select * from user where id=?';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    updateUser : function (username, pic, id, callback) {
        var sql = 'update user set username=?, profile_pic_url=? where id=?';
        db.query(sql, [username, pic, id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },
}

module.exports = userDB