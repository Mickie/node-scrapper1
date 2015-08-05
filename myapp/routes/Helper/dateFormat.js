module.exports.dateFormat = function(){
     this.myCallBack;
     this.getArray = function(callBack){
          this.myCallBack=callBack;
          function formatDateStr(arrayReady,aCallBack){
             var dateArray=[],
                 startDate = new Date('2014-12-26'),
                 startTime=startDate.getTime(),
                 curDate = new Date(),
                 curTime = curDate.getTime(),
                 oneDayTime=1000*60*60*24,
                 times=Math.floor((curTime-startTime)/oneDayTime);

             for(var i=0;i<times;i++){
                 var _date=new Date(startTime+oneDayTime*i);
                 var dateStr=dateHelper(_date);
                 dateArray.push(dateStr);
                 console.log('formated date Str '+dateStr);
             }
             arrayReady(dateArray,aCallBack);
          }

         formatDateStr(this.arrayReady,this.myCallBack);
     }
     var dateHelper = function(timeObj){
         var y=timeObj.getFullYear();
         var m=timeObj.getMonth()+1;
         var d=timeObj.getDate();
         return y+"-"+m+"-"+d;
     }

     this.arrayReady=function(array,callback){
         callback(array);
     }
}