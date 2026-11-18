(function () {
  "use strict";

  bst.event.on(
    "bst.change.商品コード1",
    function (event) {

      // テスト用の文字列を設定
      event.record["照合エラー表示"].value =
        "テスト：商品コード1の変更を検知しました。";

      console.log(
        "照合エラー表示の値：",
        event.record["照合エラー表示"].value
      );

      return event;
    }
  );

})();
