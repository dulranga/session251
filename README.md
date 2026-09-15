# Web Development: From First Page to React + Tailwind

A runnable, instructor-led 90-minute workshop for learners who know basic variables and functions but are new to frontend and backend web development.

One Greeting Generator is rebuilt six times. Learners first see what the browser does with HTML, CSS, and JavaScript, then connect it to a Node API, and finally compare the same behavior in React and Tailwind CSS.

## Learning outcomes

By the end, learners can:

- describe the browser → server → response cycle;
- assign HTML, CSS, JavaScript, Node, React, and Tailwind distinct jobs;
- handle a browser event and update the DOM;
- send and inspect a JSON API request with `fetch`;
- explain why components and declarative state help as interfaces grow;
- recognize common React props, events, JSX, and `useState` patterns;
- translate familiar CSS declarations into Tailwind utilities.

## Setup

You need Node.js 22.12 or newer and npm. Any modern browser, terminal, and text editor will work.

```sh
npm install
npm test
npm run dev:01
```

Open the URL printed by Vite, normally <http://localhost:5173>. Stop a checkpoint with Ctrl+C. Start another by replacing `01` with `02` through `06`.

Each `dev:NN` command starts both the frontend and the shared API. The browser uses `/api`, and Vite forwards it to `http://localhost:3000`, avoiding operating-system-specific configuration and keeping the frontend request portable.

## The application flow

```text
Browser form
    │ POST /api/greetings { name }
    ▼
Node + Express API
    │ validates and normalizes the name
    ▼
JSON { message, normalizedName, characterCount }
    │
    ▼
Browser renders loading, success, or error state
```

Try the backend directly while a checkpoint is running:

```text
http://localhost:3000/api/health
```

The greeting endpoint accepts `POST /api/greetings` with JSON such as `{ "name": "Ada" }`. Blank or non-string names return HTTP 400 and `{ "error": "Name is required." }`.

## 90-minute run sheet

| Time | Checkpoint | Demo and discussion | Learner activity |
| --- | --- | --- | --- |
| 0–8 min | Mental model | Browser, frontend, backend, URL, HTTP, request, response; inspect `/api/health` | Predict what must happen after a button click |
| 8–20 min | `01-static` | Semantic HTML, labels, classes, CSS selectors, box model, focus and responsive styles | Personalize markup and button styling |
| 20–31 min | `02-vanilla-click` | Form event, `preventDefault`, DOM selection and mutation, local counter | Change behavior and add Reset |
| 31–46 min | `03-vanilla-api` | Node route, JSON, `fetch`, status codes, DevTools Network panel, async loading/error/success | Inspect and deliberately break a request |
| 46–54 min | Compare | Count the DOM references and manually coordinated states; define React and declarative rendering | Identify state the UI must remember |
| 54–65 min | `04-react-component` | JSX, component function, props, events, controlled input, `useState` and updater function | Trace state and improve Reset |
| 65–76 min | `05-react-api` | Component boundaries, API state, conditional UI, immutable updates | Add successful greeting history |
| 76–87 min | `06-react-tailwind` | Compare conventional CSS with utilities, variants, responsive prefixes, and static class detection | Translate and modify utilities |
| 87–90 min | Verify | Run tests and recap the full data flow | Explain when each tool helps |

The activity instructions and completion checks are in each checkpoint's `ACTIVITY.md`.

## Teaching notes

### HTML, CSS, and JavaScript first

Start with the browser's native building blocks. HTML describes meaning and structure, CSS describes presentation, and JavaScript responds to events and changes the page. In checkpoint 02, pause on every DOM query: each is a relationship the developer must keep correct.

Checkpoint 03 adds multiple possible states: idle, loading, success, and error. Ask learners what could go wrong before showing the implementation. Compare the request payload and response body in the Network panel.

### Why and what is React?

React is a JavaScript library for describing user interfaces as reusable components. It does not replace HTML knowledge, CSS, the browser, HTTP, or the backend.

Use checkpoints 03 and 05 side by side. The vanilla version instructs individual DOM nodes how to change. The React version changes JavaScript state and returns the UI that corresponds to that state. Point out that the React version is not important because it is shorter—it is useful because relationships between state and UI are explicit and components provide boundaries as the page grows.

This small client-rendered Vite application is deliberately a teaching setup, not a recommendation that every production website needs React.

### Why and what is Tailwind?

Checkpoint 05 uses ordinary CSS classes and remains a valid solution. Tailwind is then introduced as a different styling workflow: small utility classes are composed in markup, including state variants such as `hover:` and responsive variants such as `sm:`.

Compare one component at a time. Tailwind reduces naming and context switching, and encourages a shared spacing/color scale; the tradeoff is denser markup and a class vocabulary to learn. It does not replace CSS concepts—the utilities map back to CSS declarations.

## Checkpoints

- `01-static`: semantic HTML and conventional CSS; no behavior.
- `02-vanilla-click`: local event handling, safe DOM output, validation, and a counter.
- `03-vanilla-api`: `fetch`, Node processing, JSON, and four request states.
- `04-react-component`: the local button example rebuilt with a reusable component and state.
- `05-react-api`: the full API flow split into small React components with conventional CSS.
- `06-react-tailwind`: identical API behavior, the history activity solution, and Tailwind utilities.

## Verification

```sh
npm test
npm run build
```

Tests are a workshop safety net, not a testing lesson. They cover backend validation and normalization, safe vanilla DOM behavior, API request shapes, loading/success/error states, React state updates, repeated requests, history, and clearing history. Builds verify that every checkpoint—including Tailwind—can produce deployable static assets.

Manual checks still matter:

- operate each form with the keyboard;
- confirm focus is visible;
- try blank and whitespace-only names;
- stop the API and observe the network-error state;
- resize the browser to a narrow viewport;
- confirm there are no errors in the browser console.

## Troubleshooting

- If a port is already in use, stop the earlier checkpoint before starting another.
- If the page loads but API requests fail, confirm the `API` process is still running in the same terminal output.
- If dependencies behave differently across machines, delete only `node_modules`, keep `package-lock.json`, and run `npm install` again.
- If a learner falls behind, open the next checkpoint as a working reference rather than debugging through the remainder of the workshop.
