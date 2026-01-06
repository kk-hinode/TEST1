(function(){

  var events = [
    'app.record.edit.change.入力値',
    'app.record.edit.change.上限値',
    'app.record.edit.change.下限値',
    'app.record.create.change.入力値',
    'app.record.create.change.上限値',
    'app.record.create.change.下限値'
  ];

  kintone.events.on(events, function(event) {
    var rec = event.record;

    var input = Number(rec.入力値.value);
    var upper = Number(rec.上限値.value);
    var lower = Number(rec.下限値.value);

    if (isNaN(input) || isNaN(upper) || isNaN(lower)) {
      rec.結果値.value = null;
      return event;
    }

    if (input > upper || input < lower) {
      rec.結果値.value = 0;
    } else {
      rec.結果値.value = input;
    }

    return event;
  });

})();
