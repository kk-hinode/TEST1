(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    // 商品コード1のフィールドを取得
    var field = event.container.querySelector(
      '[field-id="商品コード1"]'
    );

    // フィールド内の入力要素を取得
    var input = field
      ? field.querySelector("input")
      : null;

    console.log("入力欄のフィールド：", field);
    console.log("入力欄のinput要素：", input);

    if (input) {
      console.log("入力欄の現在値：", input.value);
    }

    return event;
  });

})();
