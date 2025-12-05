# majin2workflows

## プロジェクトについて

まじん式プロンプトV3をベースにGoogle WorkspaceのFlows（現Workspace Studio）用にカスタマイズ。
チャットから作成したいスライドの概要を入力すると、Flowsを通して、まじんスライドが完成する。

## 前提
適宜、以下のまじんさんのnoteおよびYoutubeを参考にGASおよびFlowsを構築すること。  
[note: まじん式プロンプトV3](https://note.com/majin_108/n/n11fc2f2190e9)  
[Youtube: 【完全自動化！】「まじん式プロンプト×Workflows」で1行書くだけでGoogleスライド完全自動生成へ！](https://youtu.be/XYZXHU3GNqI)

## 使い方
1. 以下まじん式プロンプトV3からGAS関係のプログラムをダウンロードして、GASを構築する。  
   - コード.gs.txt
   - index.html.txt  
     ※appsscript.json.txtは本github上のjsonファイルを使用するため不要
2. GASにworkflowsLink.gsおよびappsscript.jsonの内容をコピーする。
   - appsscript.jsonを表示するには、GASのエディタの左サイドバー一番下の「プロジェクトの設定」を開き、全般設定内の「「appsscript.json」マニフェスト ファイルをエディタで表示する」にチェックを入れる必要がある。  
3. GASのデプロイをテストからGASをflowsにインストールする。
4. Flows上でワークフローを構築する。 

