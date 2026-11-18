
(function () {
  "use strict";

  bst.event.on(
    "bst.change.商品コード1",
    function (event) {

      console.log(
        "入力欄の変更イベントが発生しました"
      );

      console.log(
        "商品コード1：",
        event.record["商品コード1"].value
      );

      console.log(
        "商品コード照合1：",
        event.record["商品コード照合1"].value
      );

      return event;
    }
  );

})();
