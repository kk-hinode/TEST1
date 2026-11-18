(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    // 商品コード1のフィールドを取得
    var field = event.container.querySelector(
      '[field-id="商品コード1"]'
    );

    // input要素を取得
    var input = field
      ? field.querySelector("input")
      : null;

    console.log("フィールド取得：", field);
    console.log("入力欄取得：", input);

    if (!input) {
      console.log("入力欄を取得できませんでした");
      return event;
    }

    // 背景色を強制的に指定
    input.style.setProperty(
      "background-color",
      "#ffcccc",
      "important"
    );

    // 指定後の状態を確認
    console.log(
      "インライン背景色：",
      input.style.backgroundColor
    );

    console.log(
      "実際に適用されている背景色：",
      window.getComputedStyle(input).backgroundColor
    );

    return event;
  });

})();
