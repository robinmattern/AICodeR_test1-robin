import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "You are a web developer with expertise in JavaScript and Lit Components.  When writing JavaScript modules, please use ES6 import statements and an .mjs extension.  Use file names with words starting with a capital Letter separated with underscores. "
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "I have a challenging project using lit components. Are you up for it?"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Absolutely! I'd be happy to help with your project using Lit Components. What specific challenge or task do you need assistance with? Please provide some details so I can better understand your requirements."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "I would like to create a reusable component that lives in a parent container that fills the entire page \r\n            (or that fills the entire section between a header and a footer, but that's later). \r\n            \r\n            For now I'd like this parent container to hold multiple instances of a resuable components that \r\n            we'll name Floating_Box that lives in index.html.  Can you write this using these file names, index.html, \r\n            Parent_Container.mjs and Floating_Box.mjs?\r\n            \r\n            Here is the challenging part.  I'd like this Floating_Box component and its custom HTML tag to have\r\n            an attribute of \\`draggable\\` and \\`resizeable\\`. Furthermore, Pleased create global property, \\`dndEnabled\\`, \r\n            that will allow me to turn on and off the user's ability to drag and resize the floating boxes. "
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Sure, I can help you set that up. We will create the `index.html` file and two JavaScript modules: `Parent_Container.mjs` and `Floating_Box.mjs`. In addition, we'll implement the `draggable` and `resizable` functionality with the ability to enable or disable it using a global property `dndEnabled`.\n\nHere are the files:\n\n### index.html\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Floating Boxes with Lit</title>\n    <script type=\"module\" src=\"./Parent_Container.mjs\"></script>\n</head>\n<body>\n    <parent-container></parent-container>\n\n    <script>\n        // Global property to enable/disable drag and drop & resize\n        window.dndEnabled = true;\n\n        // Example of how to toggle it\n        document.addEventListener('keydown', (event) => {\n            if (event.key === 'd') {\n                window.dndEnabled = !window.dndEnabled;\n                console.log(`Drag and Drop is now ${window.dndEnabled ? 'enabled' : 'disabled'}`);\n            }\n        });\n    </script>\n</body>\n</html>\n```\n\n### Parent_Container.mjs\n```javascript\nimport { LitElement, html, css } from 'lit';\nimport './Floating_Box.mjs';\n\nclass ParentContainer extends LitElement {\n  static styles = css`\n    :host {\n      display: block;\n      box-sizing: border-box;\n      width: 100vw;\n      height: 100vh;\n      position: relative;\n    }\n  `;\n\n  render() {\n    return html`\n      <floating-box draggable resizable></floating-box>\n      <floating-box draggable resizable></floating-box>\n      <floating-box draggable resizable></floating-box>\n    `;\n  }\n}\n\ncustomElements.define('parent-container', ParentContainer);\n```\n\n### Floating_Box.mjs\n```javascript\nimport { LitElement, html, css } from 'lit';\n\nclass FloatingBox extends LitElement {\n  static styles = css`\n    :host {\n      display: block;\n      width: 100px;\n      height: 100px;\n      background-color: lightblue;\n      border: 1px solid #000;\n      position: absolute;\n      top: 50px;\n      left: 50px;\n      cursor: move;\n      box-sizing: border-box;\n      overflow: hidden;\n    }\n    :host([resizable])::after {\n      content: '';\n      width: 10px;\n      height: 10px;\n      background: rgba(0, 0, 0, 0.5);\n      position: absolute;\n      right: 0;\n      bottom: 0;\n      cursor: se-resize;\n    }\n  `;\n\n  constructor() {\n    super();\n    this.dragging = false;\n    this.resizing = false;\n    this.startX = 0;\n    this.startY = 0;\n    this.startWidth = 0;\n    this.startHeight = 0;\n  }\n\n  firstUpdated() {\n    this.addEventListener('mousedown', this._onMouseDown.bind(this));\n    this.addEventListener('mousemove', this._onMouseMove.bind(this));\n    this.addEventListener('mouseup', this._onMouseUp.bind(this));\n    this.addEventListener('mouseleave', this._onMouseLeave.bind(this));\n  }\n\n  _onMouseDown(e) {\n    if (!window.dndEnabled) return;\n    if (e.target === this) {\n      this.dragging = true;\n      this.startX = e.clientX - this.offsetLeft;\n      this.startY = e.clientY - this.offsetTop;\n    } else if (e.target === this.shadowRoot.querySelector('::after')) {\n      this.resizing = true;\n      this.startWidth = parseInt(document.defaultView.getComputedStyle(this).width, 10);\n      this.startHeight = parseInt(document.defaultView.getComputedStyle(this).height, 10);\n      this.startX = e.clientX;\n      this.startY = e.clientY;\n    }\n  }\n\n  _onMouseMove(e) {\n    if (!window.dndEnabled) return;\n    if (this.dragging) {\n      this.style.left = `${e.clientX - this.startX}px`;\n      this.style.top = `${e.clientY - this.startY}px`;\n    } else if (this.resizing) {\n      let width = this.startWidth + (e.clientX - this.startX);\n      let height = this.startHeight + (e.clientY - this.startY);\n      if (width > 50) this.style.width = `${width}px`;\n      if (height > 50) this.style.height = `${height}px`;\n    }\n  }\n\n  _onMouseUp() {\n    this.dragging = false;\n    this.resizing = false;\n  }\n\n  _onMouseLeave() {\n    this.dragging = false;\n    this.resizing = false;\n  }\n\n  render() {\n    return html``;\n  }\n}\n\ncustomElements.define('floating-box', FloatingBox);\n```\n\nWith this setup:\n\n- `index.html` is the main HTML file that loads the `ParentContainer` component.\n- `Parent_Container.mjs` defines the `ParentContainer` component which holds multiple `FloatingBox` instances.\n- `Floating_Box.mjs` defines the `FloatingBox` component with `draggable` and `resizable` attributes.\n- The global property `dndEnabled` toggles the drag-and-drop and resize capability.\n\nLet me know if you need further adjustments or additional features!"
        }
      ]
    }
  ],
  temperature: 1,
  max_tokens: 4095,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});