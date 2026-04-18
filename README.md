# react-java

A custom React renderer targeting [Jaylib](https://github.com/electronstudio/jaylib) (Java bindings for Raylib). Write game UI in JSX; the reconciler translates the virtual tree into Jaylib draw calls on every frame.

## How it works

```
Node.js game loop (setInterval ~16ms)
  → java-bridge calls Java tick()
  → poll Jaylib events (keyboard, mouse)
  → dispatch as React state updates
  → reconciler commits → commitUpdate / appendChildToContainer
  → buffer draw commands
  → BeginDrawing → flush draw commands → EndDrawing
```

---

## TODO

### Phase 1 — Java API refactor

- [ ] Remove the self-contained game loop from `App.run()`
- [ ] Add `init(int width, int height, String title)` — calls `InitWindow` + `SetTargetFPS`
- [ ] Add `tick()` — calls `BeginDrawing`, flushes queued draw commands, calls `EndDrawing`, returns `WindowShouldClose()`
- [ ] Add event polling methods:
  - `isKeyPressed(int key)`
  - `isKeyDown(int key)`
  - `getMouseX()` / `getMouseY()`
  - `isMouseButtonPressed(int button)`
- [ ] Add draw command methods (called by reconciler between BeginDrawing/EndDrawing):
  - `drawRect(int x, int y, int w, int h, int color)`
  - `drawText(String text, int x, int y, int fontSize, int color)`
- [ ] Rebuild JAR (`pnpm build-native`)

### Phase 2 — java-bridge bootstrap

- [ ] Import `java-bridge` in `index.jsx`
- [ ] Load the compiled JAR and instantiate `App`
- [ ] Call `app.init(800, 450, "Demo")` on startup
- [ ] Verify an empty Jaylib window opens from Node.js

### Phase 3 — Node.js game loop

- [ ] Set up `setInterval` at ~60fps in `index.jsx`
- [ ] Each tick: call `app.tick()`, check return value, call `process.exit()` on window close
- [ ] Verify window stays open and closes cleanly

### Phase 4 — Reconciler → draw commands

- [ ] Define host component types: `rect`, `text` (used in JSX like `<rect x={0} y={0} w={100} h={100} color={VIOLET} />`)
- [ ] In `appendChildToContainer` and `commitUpdate`: walk the committed tree and call `app.drawRect` / `app.drawText` for each node
- [ ] Buffer draw commands in JS; flush them inside `tick()` between `BeginDrawing` / `EndDrawing`
- [ ] Render a static `<App />` with hardcoded rect/text and verify it draws on screen

### Phase 5 — Event dispatch into React

- [ ] In the game loop tick, poll Java for events after `app.tick()`
- [ ] Maintain a simple mutable event store in JS (plain object, no library needed)
- [ ] On event detected, call `renderer.updateContainer(...)` with updated props/state
- [ ] Write a test component that changes color when spacebar is pressed
- [ ] Verify React reconciler triggers `commitUpdate` and the new color draws next frame

### Phase 6 — Polish

- [ ] Handle `removeChild` / `removeChildFromContainer` — clear draw commands for removed nodes
- [ ] Support `children` nesting (e.g. `<group>` as a layout container)
- [ ] Add color constants file mapping Raylib color names to int values
- [ ] Add mouse hover / click detection using mouse position vs rect bounds
