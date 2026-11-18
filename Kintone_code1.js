
(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    console.log("商品コード1の変更イベント");

    // 入力画面内の入力要素を取得
    var elements = event.container.querySelectorAll(
      "input, textarea, select"
    );

    // 各入力要素の情報を一覧表示
    var elementInfo = Array.from(elements).map(function (el, index) {
      return {
        番号: index,
        種類: el.tagName,
        ID: el.id,
        Name: el.name,
        Class: el.className,
        Value: el.value,
        HTML: el.outerHTML
      };
    });

    console.table(elementInfo);

    return event;
  });

})();
