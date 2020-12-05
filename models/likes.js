// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');

var userDB = {
    getListingLikes : function (id, callback) {
        var sql = 'SELECT u.id, u.profile_pic_url, listing.title, listing.description, listing.price FROM user u INNER JOIN likes ON likes.fk_user_id = u.id INNER JOIN listing ON likes.fk_listing_id = listing.id WHERE likes.fk_listing_id=?;';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    postListingLikes : function (fk_user_id, fk_listing_id, callback) {
        var sql = 'insert into likes (fk_user_id, fk_listing_id) values (?,?)';
        db.query(sql, [fk_user_id, fk_listing_id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    deleteListingLikes : function (fk_listing_id, fk_user_id, callback) {
        var sql = 'delete from likes where fk_listing_id=? and fk_user_id=?';
        db.query(sql, [fk_listing_id, fk_user_id], function(err,result){
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