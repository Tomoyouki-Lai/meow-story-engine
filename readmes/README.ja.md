[English](../README.md) | [Español](README.es.md) | [繁中](README.zh-Hant.md) | [简中](README.zh-Hans.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

# にゃんこ物語エンジン (Meow Story Engine)

**にゃんこ物語エンジン**は、**AIによる「カード形式の章＋マルチエンディング」**の育成・物語ゲーム向けに設計された、超軽量な概念実証（PoC）ノベルゲームエンジンです。
ゲームのシナリオは**JSON**ファイルで定義するため、LLMがストーリーを簡単に作成できます。

👉 [**“にゃんこ物語エンジン”**](https://meow-story-engine.vercel.app/) デモゲームを遊ぶ

---

## 特徴

- 📖 **カード形式のイベント**：各章は16枚のイベントカードで構成
- 🔀 **マルチエンディング**：4つの通常エンディング＋1つの隠しエンディング
- 🎭 **選択肢による分岐**：プレイヤーの選択が物語の行方を左右する
- 🎒 **リソースシステム**：体力・満腹度・気力などのステータス管理に対応
- 🌟 **隠しルート**：特定の条件でサイドストーリーが解放される

---

## 使い方

1. このリポジトリをクローンします：
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. index.htmlをブラウザで開きます（ローカル環境でOK）。
3. story.jsonとfriends.jsonを編集して、オリジナルのストーリーや友達との交流を作ってみましょう。

---

## プロジェクト構成

```
meow-story-engin/
├── index.html
├── script.js
├── style.css
│
└── /stories
    └── /story 1
        └── /chapter 1
            ├── story.json          (ストーリーデータ)
            ├── /imgs               (イベントCG、エンディング、ロゴなどの画像)
            /npc_imgs               (キャラクターやNPCの立ち絵)
```
---

## Story JSON のサンプル

```
{
  "chapter": "チャプター1 入学式",
  "cards": [
    {
      "id": "c1",
      "text": "にゃんこちゃんは両親に別れを告げ、学校へ向かう電車に乗り込んだ。",
      "choices": [
        { "text": "窓の外の景色を眺める", "next": "c2" },
        { "text": "うつむいて未来について考える", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "通常エンディングA", "text": "平凡な一日が終わった。" },
    { "id": "h1", "title": "隠しエンディング", "text": "にゃんこちゃんは新たな冒険を発見した！" }
  ]
}
```

---

## コントリビュート

プルリクエスト（Pull Request）でのコントリビュート、大歓迎です！
- 新しいストーリーJSON（章・シナリオ）
- 新機能（UI、リソース管理、シナリオ生成、アニメーション生成など）
- バグ修正

---

## ライセンス

このプロジェクトは Apache-2.0 ライセンス の下で公開されています。
