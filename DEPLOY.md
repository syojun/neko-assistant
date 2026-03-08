# GitHub Pages デプロイ手順

## 1. GitHub リポジトリの準備

1. [https://github.com/syojun/neko-assistant](https://github.com/syojun/neko-assistant) にリポジトリが作成されていることを確認
2. ローカルのプロジェクトをリモートにプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/syojun/neko-assistant.git
git push -u origin main
```

## 2. GitHub シークレットの設定

ビルド時に Dify API の環境変数が必要です。リポジトリの **Settings → Secrets and variables → Actions** で以下を追加してください：

| シークレット名 | 値 |
|--------------|-----|
| `VITE_DIFY_API_BASE_URL` | `https://api.dify.ai/v1` |
| `VITE_DIFY_API_KEY` | あなたの Dify API キー（例: `app-EkluoucivKydNPeFSvgWRjsD`） |

## 3. GitHub Pages の有効化

1. リポジトリの **Settings → Pages**
2. **Source**: **"GitHub Actions"** を選択
3. 保存

## 4. デプロイ

`main` ブランチにプッシュすると、自動的にビルド・デプロイが実行されます。

**公開URL**: https://syojun.github.io/neko-assistant/

## 注意

- シークレットを設定しないとビルドが失敗します
- デプロイの進行状況は **Actions** タブで確認できます
