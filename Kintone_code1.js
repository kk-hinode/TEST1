
(function () {
  "use strict";

  bst.event.on("bst.change.商品コード1", function (event) {

    var elements = event.container.querySelectorAll("input");

    elements.forEach(function (el, index) {

      if (el.value === "320119") {
        console.log("番号：" + index);
        console.log("親要素：", el.parentElement);
        console.log("2階層上：", el.parentElement.parentElement);
      }

    });

    return event;
  });

})();
