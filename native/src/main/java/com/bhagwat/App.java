package com.bhagwat;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;

public class App {
  public static void main(String[] args) {
    InitWindow(800, 450, "Demo");
    SetTargetFPS(60);

    while(!WindowShouldClose()) {
      BeginDrawing();
      ClearBackground(BLACK);
      DrawText("Hello World", 190, 200, 20, WHITE);
      EndDrawing();
    }

    CloseWindow();
  }
}
