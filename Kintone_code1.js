
(function () {
  "use strict";

  // 商品コード照合1の変更イベントを検知
  bst.event.on(
    "bst.change.商品コード照合1",
    function (event) {

      console.log(
        "照合欄の変更イベントを検知しました"
      );

      console.log(
        "変更後の照合値：",
        event.record["商品コード照合1"].value
      );

      // テスト用メッセージを設定
      event.record["照合エラー表示"].value =
        "テスト：商品コード照合1の変更を検知しました。";

      return event;
    }
  );

})();


})();

