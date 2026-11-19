
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


  // ② 値を取得して前後の空白を除去する関数
  function normalizeValue(value) {
    return String(value ?? "").trim();
  }


  // ③ レコード全体を照合して不一致一覧を作成する関数
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


  // ④ 新規レコードの保存実行前イベント
  bst.event.on("bst.create.submit", function (event) {

    console.log("保存実行前イベントが発生しました");

    // 送信時点の値を使って全組を照合
    var mismatchFields = collectMismatches(event.record);

    console.log(
      "送信時の不一致フィールド：",
      mismatchFields
    );

    // エラー表示フィールドを更新
    if (mismatchFields.length === 0) {

      event.record["照合エラー表示"].value = "";

    } else {

      event.record["照合エラー表示"].value =
        "以下の項目が照合結果と一致していません。\n" +
        mismatchFields.map(function (field) {
          return "・" + field;
        }).join("\n");

    }

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

