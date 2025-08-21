[English](../README.md) | [Español](README.es.md) | [繁中](README.zh-Hant.md) | [简中](README.zh-Hans.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

# 냥이 스토리 엔진 (Meow Story Engine)
**냥이 스토리 엔진**은 **AI가 생성하는 '카드형 챕터 + 멀티 엔딩'** 방식의 육성/스토리 게임을 위해 설계된 초경량 개념 증명(PoC) 인터랙티브 소설 엔진입니다.
게임 스크립트는 **JSON 파일**로 정의하여 LLM이 스토리를 쉽게 작성할 수 있습니다.

---

## 주요 특징

- 📖 **카드형 이벤트**: 각 챕터는 16장의 이벤트 카드로 구성됩니다.
- 🔀 **멀티 엔딩**: 4개의 일반 엔딩 + 1개의 히든 엔딩이 있습니다.
- 🎭 **분기형 상호작용**: 플레이어의 선택이 스토리의 흐름에 영향을 줍니다.
- 🎒 **자원 시스템**: 체력 / 포만감 / 활력 등 능력치 관리를 지원합니다.
- 🌟 **히든 루트**: 특정 조건을 만족하면 사이드 스토리가 열립니다.

---

## 사용법

1. 이 프로젝트를 클론하세요:
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. index.html 파일을 여세요 (로컬 브라우저에서 바로 실행 가능).
3. story.json과 friends.json 파일을 수정하여 나만의 스토리와 친구 상호작용을 만들어보세요.
4. 
---

## 프로젝트 구조

```
meow-story-engin/
├── index.html
├── script.js
├── style.css
│
└── /stories
    └── /story 1
        └── /chapter 1
            ├── story.json          (스토리 데이터)
            ├── /imgs/              (이벤트, 엔딩, 로고 등 이미지)
            │   ├── cover.png
            │   └── ending.png
            └── /npc_imgs/          (모든 캐릭터/NPC 이미지)
                ├── player-male.png
                └── player-female.png
```
---

## Story JSON 예시

```
{
  "chapter": "챕터 1 입학식",
  "cards": [
    {
      "id": "c1",
      "text": "냥이는 부모님과 작별하고 학교로 가는 전철에 올라탔습니다.",
      "choices": [
        { "text": "창밖 풍경을 본다", "next": "c2" },
        { "text": "고개를 숙이고 미래를 생각한다", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "일반 엔딩 A", "text": "평범한 하루가 끝났습니다." },
    { "id": "h1", "title": "히든 엔딩", "text": "냥이는 새로운 모험을 발견했습니다!" }
  ]
}
```

---

## 기여하기

Pull Request를 통한 기여를 언제나 환영합니다!
- 새로운 스토리 JSON (챕터 / 시나리오)
- 새로운 기능 (UI, 자원 관리, 스크립트 생성, 애니메이션 생성 등)
- 버그 수정

---

## 라이선스

이 프로젝트는 Apache-2.0 라이선스를 따릅니다.
