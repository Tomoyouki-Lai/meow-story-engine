[English](../README.md) | [Español](README.es.md) | [繁中](README.zh-Hant.md) | [简中](README.zh-Hans.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

# にゃんこ物語エンジン (Meow Story Engine)
**にゃんこ物語エンジン**は、**AIによる「カード形式の章＋マルチエンディング」**の育成・物語ゲーム向けに設計された、超軽量な概念実証（PoC）ノベルゲームエンジンです。
ゲームのシナリオは**JSON**ファイルで定義するため、LLMがストーリーを簡単に作成できます。

---

## 特點

- 📖 **卡片式事件**：每章節由 16 張事件卡組成  
- 🔀 **多重結局**：4 種普通結局 + 1 種隱藏結局  
- 🎭 **分支互動**：玩家選擇會影響故事走向  
- 🎒 **資源系統**：支援體力 / 飽食 / 精力等數值管理  
- 🌟 **隱藏路線**：特定條件觸發支線劇情  

---

## 使用方式

1. Clone 本專案：
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. 開啟 index.html（本地瀏覽器即可執行）。
3. 修改 story.json 與 friends.json 來自訂劇情與好友互動。

---

## 專案結構

```
meow-story-engin/
├── index.html
├── script.js
├── style.css
│
└── /stories
    └── /story 1
        └── /chapter 1
            ├── story.json          (Story data)
            ├── /imgs/              (For event images, endings, logos, etc.)
            │   ├── cover.png
            │   └── ending.png
            └── /npc_imgs/          (For all character/NPC portraits)
                ├── player-male.png
                └── player-female.png
```
---

## Story JSON 範例

```
{
  "chapter": "Chapter 1 入學典禮",
  "cards": [
    {
      "id": "c1",
      "text": "喵娘告別父母，踏上前往學校的電車。",
      "choices": [
        { "text": "望向窗外風景", "next": "c2" },
        { "text": "低頭思考未來", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "普通結局 A", "text": "平凡的一天結束了。" },
    { "id": "h1", "title": "隱藏結局", "text": "喵娘發現了全新的冒險！" }
  ]
}
```

---

## 貢獻

歡迎透過 Pull Request 貢獻：
- 新的故事 JSON（章節 / 劇本）
- 新的功能（UI、資源管理、劇本生成、動畫生成）
- Bug 修正

---

## 授權

本專案採用 Apache-2.0 License。
