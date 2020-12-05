// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var db = require('./databaseConfig.js');

var userDB = {
    getOffersById : function (id, callback) {
        var sql = 'select * from offers where fk_listing_id=?';
        db.query(sql, [id], function(err,result){
            if(err){
                console.log(err);
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },

    postOffers : function (fk_listing_id,offer, fk_offeror_id, callback) {
        var sql = 'insert into offers (offer,fk_offeror_id,fk_listing_id) values (?,?,?)';
        db.query(sql, [offer,fk_listing_id , fk_offeror_id], function(err,result){
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