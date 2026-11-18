
(function () {
  "use strict";

  // ① 照合するフィールドの組み合わせ
  var fieldPairs = [
    {
      input: "商品コード1",
      check: "商品コード照合1"
    },
    {
      input: "商品コード2",
      check: "商品コード照合2"
    },
    {
      input: "商品コード3",
      check: "商品コード照合3"
    }
  ];


  // ② 1組のフィールドを照合する共通処理
  function checkField(event, pair) {

    // 入力値を取得
    var inputValue = String(
      event.record[pair.input].value ?? ""
    ).trim();

    // 照合値を取得
    var checkValue = String(
      event.record[pair.check].value ?? ""
    ).trim();


    // 入力欄のDOM要素を取得
    var field = event.container.querySelector(
      '[field-id="' + pair.input + '"]'
    );

    var input = field
      ? field.querySelector("input")
      : null;

    if (!input) {
      return;
    }


    // 照合欄が空欄なら対象外
    if (checkValue === "") {

      input.style.removeProperty("background-color");

      return;
    }


    // 入力値と照合値を比較
    if (inputValue === checkValue) {

      // 一致：背景色を解除
      input.style.removeProperty("background-color");

    } else {

      // 不一致：背景色を赤色にする
      input.style.setProperty(
        "background-color",
        "#ffcccc",
        "important"
      );

    }
  }


  // ③ 各入力欄の変更イベントを登録
  fieldPairs.forEach(function (pair) {

    bst.event.on(
      "bst.change." + pair.input,
      function (event) {

        checkField(event, pair);

        return event;
      }
    );

  });

})();
