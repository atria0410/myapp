# 業務システムテンプレート

Docker を使用した業務システムのクイックスタートセットです。  
下記のクイックスタートを参考にアプリケーションを立ち上げてください。  
ログイン機能といくつかのサンプル機能（ダイアログ、CRUD ...etc）を用意しています。

## 構成図
![画像1](https://github.com/atria0410/myapp/assets/70093193/2c003e75-441f-4681-995a-e471f5b88b6b)

### 技術スタック

- Docker
- Docker Compose
- Nginx 1.25.1
- Next.js 13.4.10
- Ruby on Rails 7.0.6
- PostgreSQL 15.3

## クイックスタート（開発モード）

.env.example ファイルをコピーして.env ファイルを作成します。  
ポート番号やデータベースのパスワードの設定を行ってください。  
メール設定はパスワードリセット機能で使用するメールアカウントになります。

コンテナ起動

```
docker compose -f "docker-compose.dev.yml" up -d --build
```

データベース作成

```
docker exec rails rails db:create
docker exec rails rails db:migrate
```

サンプルデータ登録（任意）  
Rails の Faker を使用して users テーブルにダミーデータを登録します。

```
docker exec rails rails db:seed
```

下記 URL でアクセスしてください。  
※ ポート番号は.env ファイルで指定した APP_PORT に置き換えてください。  
http://localhost:3000

## 開発にあたって

本アプリケーションの開発は VSCode での開発を推奨しています。  
下記手順に従いコーディングを行ってください。

### 手順

1. VSCode でプロジェクトを開きます。
2. 拡張機能タブの検索枠に「@recommended 」と入力し、表示された拡張機能を全てインストールします。
3. コンテナ起動後、Windows の場合は「Ctrl + P」、Mac の場合は「Cmd + P」でクイックオープンウィンドウを開きます。
4. 「> Open Folder in Container」と入力して実行します。
5. Windows の場合はエクスプローラ、Mac の場合は Finder が表示されるので「frontend」または「backend」フォルダを開いてください。  
   「frontend」を選択した場合は VSCode が Next.js のコンテナに接続されます。  
   「backend」を選択した場合は VSCode が Ruby on Rails のコンテナに接続されます。
