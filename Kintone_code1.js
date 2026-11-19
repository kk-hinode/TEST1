
(function () {
  "use strict";

  // ==================================================
  // ① 基本設定
  // ==================================================

  // 照合対象の項目名
  var fieldTypes = [
    "商品コード",
    "賞味期限",
    "個数",
    "受注数量"
  ];

  // 各項目の組み合わせ数
  var fieldCount = 6;

  // ルックアップフィールドのフィールドコード
  var lookupTriggerField = "伝票番号照合";

  // 照合エラー表示フィールドのフィールドコード
  var errorFieldCode = "照合エラー表示";


  // ==================================================
  // ② 照合するフィールドの組み合わせを作成
  // ==================================================

  var fieldPairs = [];

  fieldTypes.forEach(function (fieldType) {

    for (var i = 1; i <= fieldCount; i++) {

      fieldPairs.push({
        input: fieldType + i,
        check: fieldType + "照合" + i
      });

    }

  });


  // ==================================================
  // ③ 不一致フィールドを格納する配列
  // ==================================================

  var mismatchFields = [];


  // ==================================================
  // ④ 値を取得して前後の空白を除去する関数
  // ==================================================

  function normalizeValue(value) {
    return String(value ?? "").trim();
  }


  // ==================================================
  // ⑤ レコード全体を照合する関数
  // ==================================================

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

      // 入力欄と照合欄が異なる場合
      if (inputValue !== checkValue) {
        mismatches.push(pair.input);
      }

    });

    return mismatches;

  }


  // ==================================================
  // ⑥ 入力欄の背景色を更新する関数
  // ==================================================

  function updateFieldAppearance(event, pair) {

    var inputValue = normalizeValue(
      event.record[pair.input].value
    );

    var checkValue = normalizeValue(
      event.record[pair.check].value
    );

    // 対象フィールドを取得
    var field = event.container.querySelector(
      '[field-id="' + pair.input + '"]'
    );

    // inputまたはtextareaを取得
    var input = field
      ? field.querySelector("input, textarea")
      : null;

    if (!input) {
      return;
    }

    // 照合欄が空欄、または一致している場合
    if (
      checkValue === "" ||
      inputValue === checkValue
    ) {

      // 背景色を元に戻す
      input.style.removeProperty("background-color");

    } else {

      // 不一致の場合は赤色にする
      input.style.setProperty(
        "background-color",
        "#ffcccc",
        "important"
      );

    }

  }


  // ==================================================
  // ⑦ エラー表示用の文章を作成する関数
  // ==================================================

  function createErrorMessage(mismatches) {

    if (mismatches.length === 0) {
      return "";
    }

    return (
      "以下の項目が照合結果と一致していません。\n" +
      mismatches.map(function (field) {
        return "・" + field;
      }).join("\n")
    );

  }


  // ==================================================
  // ⑧ 照合結果を画面に反映する関数
  // ==================================================

  function updateComparison(event) {

    // 全24組を照合
    mismatchFields = collectMismatches(event.record);

    // 全入力欄の背景色を更新
    fieldPairs.forEach(function (pair) {
      updateFieldAppearance(event, pair);
    });

    // エラー表示フィールドを更新
    event.record[errorFieldCode].value =
      createErrorMessage(mismatchFields);

  }


  // ==================================================
  // ⑨ 入力欄の変更イベント
  // ==================================================

  fieldPairs.forEach(function (pair) {

    bst.event.on(
      "bst.change." + pair.input,
      function (event) {

        // 照合結果を画面に反映
        updateComparison(event);

        return event;

      }
    );

  });


  // ==================================================
  // ⑩ ルックアップの変更イベント
  // ==================================================

  bst.event.on(
    "bst.change." + lookupTriggerField,
    function (event) {

      // 照合結果を画面に反映
      updateComparison(event);

      return event;

    }
  );


  // ==================================================
  // ⑪ 新規レコードの保存実行前イベント
  // ==================================================

  bst.event.on(
    "bst.create.submit",
    function (event) {

      // 送信時点の最新の値で全24組を再照合
      mismatchFields = collectMismatches(event.record);

      // 全入力欄の背景色を更新
      fieldPairs.forEach(function (pair) {
        updateFieldAppearance(event, pair);
      });


      // ----------------------------------------------
      // エラー表示フィールドの画面表示を更新
      // ----------------------------------------------

      var field = event.container.querySelector(
        '[field-id="' + errorFieldCode + '"]'
      );

      var textarea = field
        ? field.querySelector("textarea")
        : null;

      if (textarea) {

        textarea.value =
          createErrorMessage(mismatchFields);

      }


      // ----------------------------------------------
      // レコード側のエラー表示フィールドも更新
      // ----------------------------------------------

      event.record[errorFieldCode].value =
        createErrorMessage(mismatchFields);


      // ----------------------------------------------
      // 不一致があれば保存をキャンセル
      // ----------------------------------------------

      if (mismatchFields.length > 0) {
        event.error = true;
      }

      return event;

    }
  );

})();


