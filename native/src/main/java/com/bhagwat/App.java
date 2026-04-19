package com.bhagwat;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;

public class App {

  public void init() {
    InitWindow(800, 450, "Demo");
    SetTargetFPS(60);
  }

  public void run() {
    while(!WindowShouldClose()) {
      BeginDrawing();
      ClearBackground(BLACK);
      DrawRectangle(0, 0, 100, 100, VIOLET);
      EndDrawing();
    }

    close();
  }

  public void close() {
    CloseWindow();
  }
}
