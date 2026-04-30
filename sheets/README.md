# Google Sheets データ入力テンプレート

このディレクトリには、サイト内データを Google スプレッドシート管理へ移すための雛形を置いています。

- `*.tsv`: Google スプレッドシートへ直接コピー&ペーストしやすいタブ区切り形式
- `*.csv`: Google スプレッドシートのインポート機能で使いやすいCSV形式

## 作成するシート

1つの Google スプレッドシート内に、次の4つのタブを作る想定です。

- `works`
- `characters`
- `glossary_materials`
- `glossary_entries`

それぞれ、対応するテンプレートを貼り付けるかインポートしてください。

## ファイル対応表

| シート名 | 貼り付け用テンプレート | インポート用テンプレート |
| --- | --- | --- |
| `works` | `works-template.tsv` | `works-template.csv` |
| `characters` | `characters-template.tsv` | `characters-template.csv` |
| `glossary_materials` | `glossary-materials-template.tsv` | `glossary-materials-template.csv` |
| `glossary_entries` | `glossary-entries-template.tsv` | `glossary-entries-template.csv` |

## 基本入力ルール

- 1行目のヘッダーは変更しない。
- `id` は英小文字・数字・ハイフンだけで書く。
  - 良い例: `fate-stay-night`
  - 避ける例: `Fate Stay Night`, `fate/stay/night`
- 日付は `YYYY-MM-DD` 形式で書く。
- 1つのセルに複数値を書く場合は `;` 区切りにする。
  - 例: `emiya-shirou;saber;tohsaka-rin`
- サイトに表示する行は `published` を `TRUE` にする。
- 入力途中・非公開の行は `published` を `FALSE` にする。
- ヘッダー名を変える場合は、サイト側の読み込みコードも同時に変更する。

## 各シートの列

### works

作品データ用です。

| 列名 | 内容 |
| --- | --- |
| `id` | 作品を安定して参照するためのID。 |
| `title` | 画面に表示する作品名。 |
| `releaseDate` | 発売日・公開日。`YYYY-MM-DD` 形式。 |
| `category` | `ゲーム`, `アニメ`, `小説` などの分類。 |
| `summary` | 一覧カードに表示する短い説明。 |
| `description` | 詳細パネルに表示する長い説明。 |
| `characterIds` | 関連キャラクターID。複数ある場合は `;` 区切り。 |
| `published` | `TRUE` で表示、`FALSE` で非表示。 |

### characters

キャラクターデータ用です。

| 列名 | 内容 |
| --- | --- |
| `id` | キャラクターを安定して参照するためのID。 |
| `name` | 画面に表示するキャラクター名。 |
| `firstAppearance` | 初登場日。`YYYY-MM-DD` 形式。 |
| `role` | `主人公`, `サーヴァント`, `魔術師` などの役割分類。 |
| `summary` | 一覧カードに表示する短い説明。 |
| `description` | 詳細パネルに表示する長い説明。 |
| `workIds` | 関連作品ID。複数ある場合は `;` 区切り。 |
| `published` | `TRUE` で表示、`FALSE` で非表示。 |

### glossary_materials

用語集の「マテリアル・辞書」単位のデータ用です。

| 列名 | 内容 |
| --- | --- |
| `id` | マテリアルを安定して参照するためのID。 |
| `material` | 画面に表示するマテリアル名・辞書名。 |
| `publicationDate` | 出版日・公開日。`YYYY-MM-DD` 形式。 |
| `summary` | マテリアル自体の短い説明。 |
| `categories` | マテリアルカテゴリ。複数ある場合は `;` 区切り。 |
| `published` | `TRUE` で表示、`FALSE` で非表示。 |

### glossary_entries

用語そのもののデータ用です。

| 列名 | 内容 |
| --- | --- |
| `materialId` | どのマテリアルに含まれる用語かを示すID。 |
| `term` | 用語名。 |
| `description` | そのマテリアル内での用語説明。 |
| `termCategories` | 用語カテゴリ。複数ある場合は `;` 区切り。 |
| `published` | `TRUE` で表示、`FALSE` で非表示。 |

## おすすめの運用手順

1. Google スプレッドシートを新規作成する。
2. `works`, `characters`, `glossary_materials`, `glossary_entries` の4タブを作る。
3. 各 `*.tsv` テンプレートの内容を、対応するタブへ貼り付ける。
4. 新しい行を追加するときは、まず `published` を `FALSE` にしておく。
5. 内容確認が終わったら `published` を `TRUE` にする。
6. 各タブをCSVとして公開し、そのCSV URLをサイト側の読み込み設定に登録する。

## CSV公開URLについて

Google スプレッドシートの各タブは、公開CSVとして読み込めます。
サイト側ではそのURLを `fetch()` で読み込み、現在のページが使っているデータ構造へ変換します。

URLの形はおおむね次のようになります。

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=SHEET_GID
```

`SPREADSHEET_ID` はスプレッドシート本体のID、`SHEET_GID` は各タブのIDです。

将来、Google スプレッドシートではなくローカルCSVやJSONへ移行しやすいように、CSV URLはページ内へ直接書き込まず、専用の設定ファイルでまとめて管理するのがおすすめです。

## 既存機能との対応

この列設計なら、現在ある機能を引き継ぎやすいです。

- 作品検索・カテゴリ絞り込み: `title`, `summary`, `description`, `category`, `releaseDate`
- 作品詳細パネルからキャラクターへのリンク: `characterIds`
- キャラクター検索・役割絞り込み: `name`, `summary`, `description`, `role`, `firstAppearance`
- キャラクター詳細パネルから作品へのリンク: `workIds`
- 用語集のマテリアル別表示: `glossary_materials` と `glossary_entries`
- 用語集の単語別表示: `glossary_entries` を `term` ごとにグループ化

## 次の実装ステップ

この雛形を Google スプレッドシートへ移した後、サイト側では次を実装します。

1. CSV URLをまとめる設定ファイルを作る。
2. CSVを読み込む共通ローダーを作る。
3. `published === TRUE` の行だけ使う。
4. ID参照を表示名へ変換する。
5. 読み込み失敗時のエラー表示を出す。
6. 入力ミス検出用のチェックページを追加する。

