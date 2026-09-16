# Web Development: From First Page to React + Tailwind

A runnable, 90-minute workshop for anyone who knows basic variables and functions but is new to frontend and backend web development.

One Greeting Generator is rebuilt six times. You will first see what the browser does with HTML, CSS, and JavaScript, then connect it to a Node API, and finally compare the same behavior in React and Tailwind CSS.

## What you'll learn

By the end, you'll be able to:

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

Each `dev:NN` command starts both the frontend and the shared API. The browser uses `/api`, and Vite forwards it to `http://localhost:3000`.

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

## Checkpoints

Each checkpoint rebuilds the same app a little further. Start at `01` and work through them in order.

| Checkpoint | What it covers | What you'll do |
| --- | --- | --- |
| `01-static` | Semantic HTML and conventional CSS, with no behavior yet | Personalize the markup and button styling |
| `02-vanilla-click` | Form events, `preventDefault`, DOM selection and mutation, a local counter | Change the behavior and add a Reset button |
| `03-vanilla-api` | Node routes, JSON, `fetch`, status codes, the Network panel, and loading/error/success states | Inspect and deliberately break a request |
| `04-react-component` | JSX, component functions, props, events, controlled inputs, `useState` | Trace the state and improve Reset |
| `05-react-api` | Component boundaries, API state, conditional UI, immutable updates | Add a history of successful greetings |
| `06-react-tailwind` | Tailwind utilities, variants, responsive prefixes | Translate CSS into utilities and modify them |

The activity instructions and completion checks for each checkpoint are in its `ACTIVITY.md`.

## Verify your work

```sh
npm test
npm run build
```

The tests cover backend validation and normalization, safe vanilla DOM behavior, API request shapes, loading/success/error states, React state updates, repeated requests, history, and clearing history. The build verifies that every checkpoint—including Tailwind—can produce deployable static assets.

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
- If you fall behind, open the next checkpoint as a working reference rather than debugging through the rest of the workshop.
