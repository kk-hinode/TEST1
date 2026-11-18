
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


  // ② 不一致フィールドを格納する配列
  var mismatchFields = [];


  // ③ 値を取得して前後の空白を除去する関数
  function normalizeValue(value) {
    return String(value ?? "").trim();
  }


  // ④ レコード全体を照合して不一致一覧を作成する関数
  function collectMismatches(record) {

    var mismatches = [];

    fieldPairs.forEach(function (pair) {

      var inputValue = normalizeValue(
        record[pair.input].value
      );

      var checkValue = normalizeValue(
        record[pair.check].value
      );

      // 照合欄が空欄なら対象外
      if (checkValue === "") {
        return;
      }

      // 不一致なら配列に追加
      if (inputValue !== checkValue) {
        mismatches.push(pair.input);
      }

    });

    return mismatches;
  }


  // ⑤ 入力欄の背景色を更新する関数
  function updateFieldAppearance(event, pair) {

    var inputValue = normalizeValue(
      event.record[pair.input].value
    );

    var checkValue = normalizeValue(
      event.record[pair.check].value
    );

    var field = event.container.querySelector(
      '[field-id="' + pair.input + '"]'
    );

    var input = field
      ? field.querySelector("input")
      : null;

    if (!input) {
      return;
    }

    // 照合欄が空欄、または一致なら通常表示
    if (
      checkValue === "" ||
      inputValue === checkValue
    ) {

      input.style.removeProperty("background-color");

    } else {

      // 不一致なら赤色表示
      input.style.setProperty(
        "background-color",
        "#ffcccc",
        "important"
      );

    }
  }


  // ⑥ 不一致フィールドを画面に表示する関数
  function updateErrorMessage(event) {

    // 不一致フィールドを取得
    var mismatches = collectMismatches(event.record);

    // 不一致がない場合
    if (mismatches.length === 0) {

      event.record["照合エラー表示"].value = "";

    } else {

      // 不一致がある場合
      event.record["照合エラー表示"].value =
        "以下の項目が照合結果と一致していません。\n" +
        mismatches.map(function (field) {
          return "・" + field;
        }).join("\n");

    }
  }


  // ⑦ 入力欄の変更イベントを登録
  fieldPairs.forEach(function (pair) {

    bst.event.on(
      "bst.change." + pair.input,
      function (event) {

        // 全組を再照合
        mismatchFields = collectMismatches(event.record);

        // 全入力欄の背景色を更新
        fieldPairs.forEach(function (targetPair) {
          updateFieldAppearance(event, targetPair);
        });

        // 不一致一覧を画面に表示
        updateErrorMessage(event);

        // 不一致一覧をコンソールに表示
        console.log(
          "不一致フィールド：",
          mismatchFields
        );

        return event;
      }
    );

  });


  // ⑧ 新規レコードの保存実行前イベント
  bst.event.on("bst.create.submit", function (event) {

    console.log("保存実行前イベントが発生しました");

    // 送信時点の値を使って全組を再照合
    mismatchFields = collectMismatches(event.record);

    // 送信時にもエラー表示を更新
    updateErrorMessage(event);

    console.log(
      "送信時の不一致フィールド：",
      mismatchFields
    );

    // 不一致が1件以上あれば保存をキャンセル
    if (mismatchFields.length > 0) {

      console.log("不一致があるため保存をキャンセルします");

      event.error = true;

    } else {

      console.log("不一致はありません。保存を許可します");

    }

    return event;
  });

})();

