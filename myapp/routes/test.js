var mysql = require('mysql');
var fs=require('fs');
var DateFormat = require('./Helper/dateFormat');
var jquery=fs.readFileSync("public/javascripts/underscore.js","utf-8");
var pool = mysql.createPool({
    host:'',
    user:'',
    password:'',
    database:''
});

exports.test = function(req, res){
    var dataArray=[];
    this.arrayHandler=new DateFormat.dateFormat();

    function start(){
        this.arrayHandler.getArray(this.getDB_data);
    }

    this.getDB_data=function(responseArr){
        var count=0;
        pool.getConnection(function(err,connection){
            for(var i=0;i<responseArr.length;i++){
                var sql="select distinct voteeid from scoreRec where scoreTime=?";
                connection.query(sql,[responseArr[i]],function(err,rows){
                    console.log('start connect to db and querry date '+responseArr[count]);
                    if(err) throw err;
                    var obj={};
                    obj.scoreTime=responseArr[count];
                    obj.val=rows.length;
                    dataArray.push(obj);
                    count++;
                    console.log('db querry '+obj.scoreTime+' result '+obj.val);
                    if(count>=responseArr.length){
                        sendToRes(dataArray);
                    }
                });
            }
        })
    }
    var sendToRes=function(dbArr){
        console.log('ready to send to res '+JSON.stringify(dbArr));
        res.end(JSON.stringify(dbArr));
    }

    start();
};