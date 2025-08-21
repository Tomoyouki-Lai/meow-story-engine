[English](../README.md) | [Español](README.es.md) | [繁中](README.zh-Hant.md) | [简中](README.zh-Hans.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

# 喵物语引擎 (Meow Story Engine)

**喵物语引擎** 是一个极轻量级的概念验证（PoC）互动小说引擎，专为 **AI 生成“卡片式章节 + 多结局”** 的养成/故事游戏设计。
游戏脚本使用 **JSON 文件** 定义，方便大语言模型（LLM）编写剧情。

👉 玩「喵物语」Demo 游戏

---

## 特性

- 📖 **卡片式事件**：每章节由 16 张事件卡组成
- 🔀 **多重结局**：4 种普通结局 + 1 种隐藏结局
- 🎭 **分支互动**：玩家选择会影响故事走向
- 🎒 **资源系统**：支持体力 / 饱食 / 精力等数值管理
- 🌟 **隐藏路线**：特定条件触发支线剧情

---

## 使用方法

1. 克隆本项目：
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. 打开 index.html（本地浏览器即可运行）。
3. 修改 story.json 与 friends.json 来自定义剧情与好友互动。

---

## 项目结构

```
meow-story-engin/
├── index.html
├── script.js
├── style.css
│
└── /stories
    └── /story 1
        └── /chapter 1
            ├── story.json          (故事腳本)
            ├── /imgs               (用于事件图片、结局、Logo等)
            /npc_imgs               (用于所有角色/NPC图片)
```
---

## Story JSON 示例

```
{
  "chapter": "Chapter 1 入学典礼",
  "cards": [
    {
      "id": "c1",
      "text": "喵娘告别父母，踏上前往学校的电车。",
      "choices": [
        { "text": "望向窗外风景", "next": "c2" },
        { "text": "低头思考未来", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "普通结局 A", "text": "平凡的一天结束了。" },
    { "id": "h1", "title": "隐藏结局", "text": "喵娘发现了全新的冒险！" }
  ]
}
```

---

## 贡献

欢迎通过 Pull Request 贡献：
- 新的故事 JSON（章节 / 脚本）
- 新的功能（UI、资源管理、脚本生成、动画生成）
- Bug 修复

---

## 许可证

本项目采用 Apache-2.0 许可证。
