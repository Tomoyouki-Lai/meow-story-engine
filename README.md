# Meow Story Engine

**Meow Story Engine** 是一個輕量化的互動小說引擎，專為 **「卡片式章節 + 多結局」** 的養成/故事遊戲設計。  
遊戲腳本使用 **JSON 檔案** 定義，方便創作者編寫與分享劇情。

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
   git clone https://github.com/yourname/meow-story-engine.git
   cd meow-story-engine
2. 開啟 index.html（本地瀏覽器即可執行）。
3. 修改 story.json 與 friends.json 來自訂劇情與好友互動。

---

## 專案結構

```
meow-story-engine/
├── index.html        # 主入口
├── style.css         # 基本樣式
├── story.json        # 劇情檔案（卡片事件）
├── friends.json      # 朋友系統
├── imgs/             # 角色與事件圖片
└── README.md

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

---

## 貢獻

歡迎透過 Pull Request 貢獻：
- 新的故事 JSON（章節 / 劇本）
- 新的功能（UI、資源管理、動畫）
- Bug 修正

---

## 授權

本專案採用 Apache-2.0 License。
