[English](../README.md) | [Español](README.es.md) | [繁中](README.zh-Hant.md) | [简中](README.zh-Hans.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

# Meow Story Engine

**Meow Story Engine** es un motor de ficción interactiva de prueba de concepto extremadamente ligero, diseñado para juegos de simulación/historia **generados por IA con "capítulos basados en cartas + múltiples finales"**.
El guion del juego se define mediante **archivos JSON**, lo que facilita que los LLMs escriban la trama.

👉 Juega la demo de [**“Meow Story”**](https://meow-story-engine.vercel.app/)

---

![Image](https://github.com/user-attachments/assets/0478ddb9-d45a-428a-b7fe-3fda3c51733a)

---

## Características

- 📖 **Eventos basados en cartas**: Cada capítulo consta de 16 cartas de evento.
- 🔀 **Múltiples finales**: 4 finales normales + 1 final oculto.
- 🎭 **Interacciones con ramificaciones**: Las elecciones del jugador afectan la dirección de la historia.
- 🎒 **Sistema de recursosㄒ: Admite la gestión de estadísticas como resistencia / saciedad / energía.
- 🌟 **Rutas ocultas**: Condiciones específicas desencadenan tramas secundarias.

---

## Modo de uso

1. Clona este proyecto:
   ```bash
   git clone https://github.com/Tomoyouki-Lai/meow-story-engine.git
   cd meow-story-engine
2. Abre index.html (se puede ejecutar en un navegador local).
3. Modifica story.json y friends.json para personalizar la trama y las interacciones con amigos.

---

## Estructura del proyecto

```
meow-story-engin/
├── index.html
├── script.js
├── style.css
│
└── /stories
    └── /story 1
        └── /chapter 1
            ├── story.json          (Datos de la historia)
            ├── /imgs               (Para imágenes de eventos, finales, logos, etc.)
            /npc_imgs               (Para todos los retratos de personajes/NPC)
```
---

## Ejemplo de JSON de historia (Story JSON)

```
{
  "chapter": "Capítulo 1 La ceremonia de ingreso",
  "cards": [
    {
      "id": "c1",
      "text": "Miau-chan se despide de sus padres y sube al tren hacia la escuela.",
      "choices": [
        { "text": "Mirar el paisaje por la ventana", "next": "c2" },
        { "text": "Bajar la cabeza y pensar en el futuro", "next": "c3" }
      ]
    }
  ],
  "endings": [
    { "id": "e1", "title": "Final Normal A", "text": "Un día ordinario ha terminado." },
    { "id": "h1", "title": "Final Oculto", "text": "¡Miau-chan descubrió una nueva aventura!" }
  ]
}
```

---

## Contribuciones

Las contribuciones a través de Pull Requests son bienvenidas:
- Nuevos JSON de historias (capítulos / guiones)
- Nuevas características (UI, gestión de recursos, generación de guiones, generación de animaciones)
- Corrección de errores (Bug fixes)

---

## Licencia

Este proyecto está bajo la Licencia Apache-2.0.
