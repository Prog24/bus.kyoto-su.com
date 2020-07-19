(function ($) {
  "use strict";
  /**
   * 接続時の時間取得関数
   */
  function getNowTime() {
    var dateObj = new Date(),
        weekDayList = ["日", "月", "火", "水", "木", "金", "土"],
        nowTime = {
            "year"          : dateObj.getFullYear(),
            "month"         : dateObj.getMonth(),
            "date"          : dateObj.getDate(),
            "hour"          : dateObj.getHours(),
            "minute"        : dateObj.getMinutes(),
            "second"        : dateObj.getSeconds(),
            "weekDayNum"    : dateObj.getDay(),
            "weekDay"       : weekDayList[dateObj.getDay()]
        };
    return nowTime;
}

  /**
   * バスの時刻データ
   */
  function getBusTime(){
    var busTime = {
      "normal" : [
        [],
        [],
        [],
        [],
        [],
        [],
        [31,56],
        [8,15,21,27,33,48,55],
        [2,9,15,22,28,35,39,43,46,49,55],
        [9,23,35,45,50],
        [0,10,20,25,30,40,50],
        [0,10,30,50],
        [10,20,30,50],
        [0,10,30,50],
        [0,10,30,40,50],
        [0,10,20,30,40,50],
        [10,20,30,35,40,45,50],
        [0,10,30,50],
        [0,10,20,25,30,40,50],
        [8,27,47],
        [7,33],
        [3,42],
        [22],
        []
      ]
    };

    return busTime;
  }

  /**
   * 次のバスの時刻取得
   */
  function calcNextBusTime(){
    var i,
        nextBusTime = null,
        nowTime = getNowTime(),
        nowHour = getNowTime().hour,
        nowMin = getNowTime().minute,
        useTimeTable = getBusTime().normal,
        nowHTable;

    // 現在時刻分の時刻表をセット
    nowHTable = useTimeTable[nowHour];

    // 次のバス時刻取得
    for (i=0; i<nowHTable.length; i+=1){
      if(nowHTable[i]<nowMin && nowMin<nowHTable[i+1]){
        nextBusTime = nowHTable[i+1];
      } else if(nowHTable[i] === nowTime){
        nextTime = nowHTable[i];
      }
    }

    // 万が一 "nextBusTime" がnullの時
    if (nextBusTime === null){
      nowMin = 0;
      nowHTable = useTimeTable[nowHour+1];
      // 次の時間のデータをセット
      nextBusTime = nowHTable[0];
    }

    return nextBusTime;
  }

  /**
   * 次のバスまでの残り時間取得関数
   */
  function calcDiffTime(nextBusTime){
    var diffTime,
        nowTime = getNowTime();
    if(nowTime.minute <= nextBusTime){
      diffTime = nextBusTime-nowTime.minute;
    }
    if(nowTime.minute > nextBusTime) {
      diffTime = (60-nowTime.minute) + nextBusTime;
    }
    return diffTime;
  }

  function init(){
    var nextBusTime = calcNextBusTime(),
        diffTime = calcDiffTime(nextBusTime),
        nextelem = document.getElementsByClassName("nextbus");
    nextelem[0].innerHTML = "次は" + nextBusTime + "分発　発車まで" + diffTime + "分です";
    window.console.log(nextBusTime);
    window.console.log(diffTime);
  }
  init();
}());