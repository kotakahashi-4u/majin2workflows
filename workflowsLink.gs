/**
 * アドオンの設定画面（カード）を構築し、表示アクションを返します。
 * * ユーザーインターフェースとして以下の要素を持つカードを作成します：
 * - ヘッダー：「まじん召喚」
 * - ウィジェット：JSONデータ入力用のテキストエリア（name: textarea_json）
 * * この関数は、Google Workspace Add-onsのManifestなどで指定される
 * トリガー関数、または特定のアクションから呼び出されることを想定しています。
 * * @return {Object} 新しいカードをスタックにプッシュするためのナビゲーションアクションオブジェクト。
 */
function onConfigFunction() {
  const card = {
    "sections": [
      {
        "header": "まじん召喚",
        "widgets": [
          {
            "textInput": {
              "name": "textarea_json",
              "label": "JSONデータを入力して下さい。",
              "hostAppDataSource" : {
                "workflowDataSource" : {
                  "includeVariables" : true
                }
              }
            }
          }
        ]
      }
    ]
  };
  return {
    "action": {
      "navigations": [{
        "push_card": card
      }]
    }
  };
}

/**
 * スライド生成のメイン処理を実行します。
 * * ユーザーインターフェースから渡されたJSONデータを解析し、
 * 実際にGoogleスライドを作成する関数（createPresentation）を呼び出します。
 * * 処理フロー:
 * 1. 引数 `e` からユーザー入力（textarea_json）を取得・検証。
 * 2. 設定のロードおよびスライド生成関数の実行。
 * 3. 処理結果に応じたレスポンス（成功時はURL、失敗時はエラー情報）を構築して返却。
 * * @param {Object} e - アドオンの実行イベントオブジェクト。
 * * @return {Object} AddOnsResponseServiceによって構築されたRenderActionオブジェクト。
 * * 成功時: 変数 "return_url" に生成されたスライドのURLをセットして返します。
 * * 失敗時: エラーメッセージを含むWorkflowErrorActionを返します。
 */
function onExecuteFunction(e) {
  try {
    const inputJson = e.workflow.actionInvocation.inputs["textarea_json"].stringValues[0];
    if (!inputJson || inputJson.trim() === "") {
      throw new Error("スライドデータ（JSON）が入力されていません。");
    }
    // 基本設定の読み込み（今回の場合はそもそも何も設定していない）
    const settings = loadSettings();

    // スライド生成処理呼び出し
    const presentationUrl = createPresentation(JSON.parse(inputJson), settings);

    const variableDataMap = { "return_url": AddOnsResponseService.newVariableData().addStringValue(presentationUrl)},
          workflowAction = AddOnsResponseService.newReturnOutputVariablesAction().setVariableDataMap(variableDataMap),
          hostAppAction = AddOnsResponseService.newHostAppAction().setWorkflowAction(workflowAction);

    return AddOnsResponseService.newRenderActionBuilder().setHostAppAction(hostAppAction).build();

  } catch (e) {
    const errorAction = AddOnsResponseService.newReturnElementErrorAction()
            .setErrorLog(AddOnsResponseService.newWorkflowTextFormat().addTextFormatElement(
            AddOnsResponseService.newTextFormatElement().setText(`エラーが発生しました: ${e.message}`)
          )),
          hostAppAction = AddOnsResponseService.newHostAppAction().setWorkflowAction(errorAction);
    return AddOnsResponseService.newRenderActionBuilder().setHostAppAction(hostAppAction).build();
  }
}
