package com.bhagwat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.raylib.Colors.BLACK;
import static com.raylib.Colors.VIOLET;
import static com.raylib.Raylib.*;

public class App {
  private static final ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<>();

  public static void main(String[] args) {
    new Thread(() -> {
      try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
        String line;
        while ((line = reader.readLine()) != null) {
          queue.add(line);
        }
      } catch (IOException e) {
          e.printStackTrace();
      }
    }).start();

    InitWindow(800, 450, "Hello World");
    SetTargetFPS(60);

    while (!WindowShouldClose()) {
      while (!queue.isEmpty()) {
        System.out.println("Current queue item: " + queue.poll());
      }

      BeginDrawing();
      ClearBackground(BLACK);
      DrawRectangle(0, 0, 100, 100, VIOLET);
      EndDrawing();
    }

    System.out.println("{\"type\":\"WINDOW_CLOSED\"}");
    System.out.flush();
    CloseWindow();
  }
}
