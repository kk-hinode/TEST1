
(function () {
  "use strict";

  bst.event.on("bst.create.submit", function (event) {

    console.log("保存実行前イベントが発生しました");

    // event.container が取得できるか確認
    console.log(
      "event.container：",
      event.container
    );

    if (!event.container) {
      console.log("event.containerを取得できませんでした");
      event.error = true;
      return event;
    }

    // エラー表示フィールドを取得
    var field = event.container.querySelector(
      '[field-id="照合エラー表示"]'
    );

    console.log(
      "照合エラー表示フィールド：",
      field
    );

    if (field) {

      // フィールド内部の入力要素を取得
      var elements = field.querySelectorAll(
        "input, textarea"
      );

      console.log(
        "フィールド内部の入力要素数：",
        elements.length
      );

      elements.forEach(function (element, index) {

        console.log(
          "入力要素 " + index,
          {
            tagName: element.tagName,
            className: element.className,
            value: element.value
          }
        );

      });

    }

    // テストなので保存をキャンセル
    event.error = true;

    return event;
  });

})();


