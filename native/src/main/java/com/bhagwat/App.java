package com.bhagwat;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;

interface DrawCallback {
  void draw();
}

public class App {

  public void init(String windowName) {
    InitWindow(800, 450, windowName);
    SetTargetFPS(60);

    run(() -> {
      DrawRectangle(0, 0, 100, 100, VIOLET);
    });
  }

  public void run(DrawCallback drawCallback) {
    while(!WindowShouldClose()) {
      BeginDrawing();
      ClearBackground(BLACK);
      drawCallback.draw();
      EndDrawing();
    }

    close();
  }

  public void close() {
    CloseWindow();
  }
}
