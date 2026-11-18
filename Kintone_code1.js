
(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    console.log("商品コード1の変更イベントが発生しました");

    console.log("入力値：", event.record.商品コード1.value);
    console.log("照合値：", event.record.商品コード照合1.value);

    console.log("イベント情報：", event);
    console.log("入力画面のDOM：", event.container);

    return event;
  });

})();
