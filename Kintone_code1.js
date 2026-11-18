(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    // 入力値と照合値を取得
    var inputValue = String(
      event.record.商品コード1.value ?? ""
    ).trim();

    var checkValue = String(
      event.record.商品コード照合1.value ?? ""
    ).trim();

    // 入力欄のDOM要素を取得
    var field = event.container.querySelector(
      '[field-id="商品コード1"]'
    );

    var input = field
      ? field.querySelector("input")
      : null;

    if (!input) {
      return event;
    }

    // 照合欄が空欄なら通常表示
    if (checkValue === "") {

      input.style.removeProperty("background-color");

      return event;
    }

    // 一致・不一致を判定
    if (inputValue === checkValue) {

      // 一致：背景色を解除
      input.style.removeProperty("background-color");

    } else {

      // 不一致：背景色を薄い赤色にする
      input.style.setProperty(
        "background-color",
        "#ffcccc",
        "important"
      );

    }

    return event;
  });

})();
