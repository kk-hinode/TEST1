
(function () {
  "use strict";

  // ① 照合するフィールドの組み合わせ

  // 照合対象の項目名
  var fieldTypes = [
    "商品コード",
    "賞味期限",
    "個数",
    "受注数量"
  ];

  // 照合するフィールドの組み合わせを格納する配列
  var fieldPairs = [];

  // 各項目について1～6までの組み合わせを作成
  fieldTypes.forEach(function (fieldType) {

    for (var i = 1; i <= 6; i++) {

      fieldPairs.push({
        input: fieldType + i,
        check: fieldType + "照合" + i
      });

    }

  });


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

    // inputまたはtextareaを取得
    var input = field
      ? field.querySelector("input, textarea")
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


  // ⑥ エラー表示用の文章を作成する関数
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

        // エラー表示フィールドの値を更新
        event.record["照合エラー表示"].value =
          createErrorMessage(mismatchFields);

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

    // 全入力欄の背景色を最新の照合結果に更新
    fieldPairs.forEach(function (pair) {
      updateFieldAppearance(event, pair);
    });

    console.log(
      "送信時の不一致フィールド：",
      mismatchFields
    );

    // 画面上のエラー表示フィールドを取得
    var field = event.container.querySelector(
      '[field-id="照合エラー表示"]'
    );

    var textarea = field
      ? field.querySelector("textarea")
      : null;

    // TEXTAREAにエラーメッセージを直接設定
    if (textarea) {

      textarea.value =
        createErrorMessage(mismatchFields);

      console.log(
        "画面上のエラー表示：",
        textarea.value
      );

    } else {

      console.log(
        "照合エラー表示のTEXTAREAを取得できませんでした"
      );

    }

    // レコード側の値も更新
    event.record["照合エラー表示"].value =
      createErrorMessage(mismatchFields);

    // 不一致が1件以上あれば保存をキャンセル
    if (mismatchFields.length > 0) {

      console.log("不一致があるため保存をキャンセルします");

      event.error = true;

    } else {

      console.log("不一致はありません。保存を許可します");

    }

    return event;
  });
  // ルックアップ変更後の照合処理
  bst.event.on(
    "bst.change.伝票番号照合",
    function (event) {

      console.log("ルックアップ変更イベントを検知しました");

      // 全24組を再照合
      mismatchFields = collectMismatches(event.record);

      // 全入力欄の背景色を更新
      fieldPairs.forEach(function (pair) {
        updateFieldAppearance(event, pair);
      });

      // エラー表示フィールドを更新
      event.record["照合エラー表示"].value =
        createErrorMessage(mismatchFields);

      // コンソール確認
      console.log(
        "ルックアップ後の不一致フィールド：",
        mismatchFields
      );

      return event;
    }
  );
})();


