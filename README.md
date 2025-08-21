[English](README.md) | [Español](readmes/README.es.md) | [繁中](readmes/README.zh-Hant.md) | [简中](readmes/README.zh-Hans.md) | [日本語](readmes/README.ja.md) | [한국어](readmes/README.ko.md)

# Meow Story Engine
**Meow Story Engine** is an extremely lightweight, proof-of-concept interactive fiction engine designed for **AI-generated "card-based chapters + multiple endings"** simulation/story games.
The game script is defined using **JSON files**, making it easy for LLMs to write the plot.

👉 Play the demo game [**“Meow Story”**](https://meow-story-engine.vercel.app/){:target="_blank" rel="noopener"}

---

## Features

- 📖 **Card-based Events**: Each chapter consists of 16 event cards.
- 🔀 **Multiple Endings**: 4 normal endings + 1 hidden ending.
- 🎭 **Branching Interactions**: Player choices affect the story's direction.
- 🎒 **Resource System**: Supports management of stats like stamina / satiety / energy.
- 🌟 **Hidden Routes**: Specific conditions trigger side plots.

---

## How to Use

1. Clone this project:
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. Open index.html (can be run in a local browser).
3. Modify story.json and friends.json to customize the plot and friend interactions.

---

## Project Structure

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
            ├── /imgs               (For event images, endings, logos, etc.)
            /npc_imgs               (For all character/NPC portraits)
```
---

## Story JSON Example

```
{
  "chapter": "Chapter 1 The Entrance Ceremony",
  "cards": [
    {
      "id": "c1",
      "text": "Meow-chan bids farewell to her parents and gets on the train to school.",
      "choices": [
        { "text": "Look at the scenery outside the window", "next": "c2" },
        { "text": "Lower head and think about the future", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "Normal Ending A", "text": "An ordinary day has ended." },
    { "id": "h1", "title": "Hidden Ending", "text": "Meow-chan discovered a brand new adventure!" }
  ]
}
```

---

## Contributing

Contributions via Pull Requests are welcome:
- New story JSON (chapters / scripts)
- New features (UI, resource management, script generation, animation generation)
- Bug fixes

---

## License

This project is licensed under the Apache-2.0 License.
