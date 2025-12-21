# 🐥 Rubber Duck App

エンジニア学習中の「詰まった」を言語化するための **ラバーダッキング支援アプリ** です。
React（フロントエンド）と Rails（API）を分離した構成で、学習ログを **書く・保存する・振り返る** ことに特化しています。

---

## コンセプト

> 問題を誰かに説明できるなら、半分は解決している

ラバーダッキングは、コードや処理内容を順番に説明することで、
自分の理解不足や思い込みに気づくデバッグ手法です。

このアプリは、その **説明する行為そのものを記録・蓄積** するために作られました。

---

## MVP機能（最小構成）

* ラバーダックログの作成
  * タイトル（任意）
  * 説明テキスト（必須）
* ログの保存（DB）
* ログ一覧表示
* ログ詳細表示

※ 認証・共有・タグ等はあえて実装していません（MVP時点）

---

## 画面構成

```
入力画面 → 一覧画面 → 詳細画面
```

* **入力画面**：今詰まっている内容を説明する
* **一覧画面**：過去のラバーダックログを振り返る
* **詳細画面**：当時の思考をそのまま確認する

---

## 技術スタック

### フロントエンド

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* Fetch API

### バックエンド

* Ruby on Rails 7.2 （APIモード）
* MySQL 8.4（開発環境）

---

## アーキテクチャ

```
[ React ]  ── fetch(JSON) ──▶  [ Rails API ] ──▶ [ DB ]
```

* フロントとバックを完全に分離
* Railsは API 専用

---

## API仕様（MVP）

| Method | Endpoint       | Description |
| ------ | -------------- | ----------- |
| GET    | /ducklogs      | ログ一覧取得      |
| POST   | /ducklogs      | ログ作成        |
| GET    | /ducklogs/:id  | ログ詳細取得      |
| PATCH  | /ducklogs/:id  | ログ編集        |
| DELETE | /ducklogs/:id  | ログ削除        |

### リクエスト・レスポンス例

#### POST /ducklogs（ログ作成）

**リクエスト:**
```json
{
  "ducklog": {
    "title": "React の hooks で詰まった",
    "content": "useState を複数使うときの順序が重要..."
  }
}
```

**レスポンス (201 Created):**
```json
{
  "id": 1,
  "title": "React の hooks で詰まった",
  "content": "useState を複数使うときの順序が重要...",
  "created_at": "2024-12-21T10:30:45.000Z",
  "updated_at": "2024-12-21T10:30:45.000Z"
}
```

#### GET /ducklogs（ログ一覧取得）

**レスポンス (200 OK):**
```json
[
  {
    "id": 1,
    "title": "React の hooks で詰まった",
    "content": "useState を複数使うときの順序が重要...",
    "created_at": "2024-12-21T10:30:45.000Z",
    "updated_at": "2024-12-21T10:30:45.000Z"
  },
  {
    "id": 2,
    "title": "Rails のアソシエーション",
    "content": "has_many と belongs_to の使い分け...",
    "created_at": "2024-12-21T11:00:00.000Z",
    "updated_at": "2024-12-21T11:00:00.000Z"
  }
]
```

---

## データモデル

```ruby
DuckLog
- id
- title :string
- content :text
- created_at
```

---

## Docker 環境での起動方法

このアプリは **Docker / docker-compose 前提**で動作します。
ローカルに Ruby や Node.js を直接入れる必要はありません。

---

## 起動方法

### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd rubber-duck
```

### 2. コンテナ起動

```bash
docker-compose build
docker-compose up
```

### 3. ブラウザでアクセス

* React: [http://localhost:5173](http://localhost:5173)
* Rails API: [http://localhost:3000](http://localhost:3000)

---

## Docker 構成

### サービス一覧

* **db**: MySQL 8.0（データベース）
* **backend**: Rails API（Ruby 3.3.10）
* **frontend**: React + Vite（Node.js）

---

## 開発メモ

### 初回セットアップ

データベース（MySQL）は自動で作成されます。必要に応じてマイグレーション実行：

```bash
docker-compose exec backend bundle exec rails db:migrate
```

### テスト実行

```bash
# RSpec テスト（全体）
docker-compose exec backend bundle exec rspec

# RSpec テスト（特定ファイル）
docker-compose exec backend bundle exec rspec spec/requests/ducklogs_spec.rb

# RSpec テスト（詳細出力）
docker-compose exec backend bundle exec rspec spec/requests/ducklogs_spec.rb --format documentation
```

### ログ確認

```bash
docker-compose logs -f frontend    # React ログ
docker-compose logs -f backend     # Rails ログ
docker-compose logs -f db          # MySQL ログ
```

### コンテナ停止

```bash
docker-compose down
```

---

## このアプリで得られること

* 問題解決プロセスの言語化
* 学習の詰まりポイントの可視化
* React × Rails の基本構成理解
* REST API / JSON通信の実践

---

## 今後の拡張予定

* 解決済みフラグ
* 編集機能
* Markdown対応
* タグ機能
* ユーザー認証

※ 実際に使って「欲しくなった機能」から追加予定

---

## 想定ユーザー

* プログラミング学習中の人
* デバッグで詰まりやすい人
* 思考整理が苦手な人

---

## メモ

小さく作り、使いながら育てることを目的とする。
