(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    // 入力値と照合値を取得
    var inputValue = event.record.商品コード1.value;
    var checkValue = event.record.商品コード照合1.value;

    // 前後の空白を除去して文字列化
    var inputText = String(inputValue ?? "").trim();
    var checkText = String(checkValue ?? "").trim();

    // 照合欄が空欄なら比較しない
    if (checkText === "") {
      console.log("照合対象外");
      return event;
    }

    // 完全一致で比較
    if (inputText === checkText) {
      console.log("一致");
    } else {
      console.log("不一致");
    }

    return event;
  });

})();
