# ⚠️ GitHub Pages 設定（重要）

現在、**ソースコード（ビルド前）** が表示されており、画面が真っ白になっています。

## 正しい設定手順

1. **https://github.com/syojun/neko-assistant/settings/pages** を開く

2. **Build and deployment** の **Source** を確認：
   - ❌ **Deploy from a branch** で **main** が選ばれている → これが原因です
   - ✅ **Deploy from a branch** で **gh-pages** を選択する
   - または **GitHub Actions** を選択する

3. **gh-pages ブランチを使う場合**：
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** を選択
   - Folder: **/ (root)**
   - **Save** をクリック

4. 設定後、数分待ってから https://syojun.github.io/neko-assistant/ を再読み込み
