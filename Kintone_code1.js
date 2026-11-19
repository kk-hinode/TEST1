
(function () {
  "use strict";

  bst.event.on("bst.create.submit", function (event) {

    console.log("保存実行前イベントが発生しました");

    // エラー表示フィールドを取得
    var field = event.container.querySelector(
      '[field-id="照合エラー表示"]'
    );

    var textarea = field
      ? field.querySelector("textarea")
      : null;

    if (textarea) {

      // 画面上のTEXTAREAに直接書き込む
      textarea.value =
        "以下の項目が照合結果と一致していません。\n" +
        "・商品コード1";

      console.log(
        "TEXTAREAへの書き込み後：",
        textarea.value
      );

    } else {

      console.log(
        "照合エラー表示のTEXTAREAを取得できませんでした"
      );

    }

    // テストのため保存をキャンセル
    event.error = true;

    return event;
  });

})();


