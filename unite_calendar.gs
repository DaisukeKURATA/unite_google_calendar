function uniteCal() {
  var mainCal = CalendarApp.getCalendarById('');//統合先のカレンダーID
  var startTime = new Date();
  var endTime = new Date();
  var title = '';//予定のタイトル
  endTime.setTime(startTime.getTime() + 14 * 24 * 60 * 60 * 1000);//何日後までの予定を同期するか。この例だと14日後
  var mainCalEvents = mainCal.getEvents(startTime, endTime);
  for(var i = 0; i < mainCalEvents.length; i++){
    var event = mainCalEvents[i];
    if(event.getTitle() == title){
      event.deleteEvent();
    } 
  }
  var subCalIds = [''];//統合元のカレンダーIDをリスト形式で列挙
  for(var i = 0; i < subCalIds.length; i++){
    var subCal = CalendarApp.getCalendarById(subCalIds[i]);
    var subCalEvents = subCal.getEvents(startTime, endTime);
    for(var j = 0; j < subCalEvents.length; j++){
      var subCalEvent = subCalEvents[j];
      if(subCalEvent.isAllDayEvent()){
        mainCal.createAllDayEvent(title, subCalEvent.getAllDayStartDate(), subCalEvent.getAllDayEndDate());
      } else {
        mainCal.createEvent(title, subCalEvent.getStartTime(), subCalEvent.getEndTime());
      }
    }
  }
}

