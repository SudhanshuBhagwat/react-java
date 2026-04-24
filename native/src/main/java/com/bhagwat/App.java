package com.bhagwat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.raylib.Colors.BLACK;
import static com.raylib.Colors.VIOLET;
import static com.raylib.Raylib.*;

public class App {
  private static final ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<>();
  private static final ConcurrentHashMap<String, Map<String, String>> objects = new ConcurrentHashMap<>();
  static ObjectMapper objectMapper;

  public App() {
    objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
  }

  public static void main(String[] args) {
    App app = new App();
    app.run();
  }

  public void run() {
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
        String item = queue.poll();
        parseCommand(Objects.requireNonNull(item));
      }

      BeginDrawing();
      ClearBackground(BLACK);
      renderObjects();
      EndDrawing();
    }

    System.out.println("{\"type\":\"WINDOW_CLOSED\"}");
    System.out.flush();
    CloseWindow();
  }

  public static void parseCommand(String message) {
      try {
          Event event = objectMapper.readValue(message, Event.class);
          switch (event.getType()) {
            case "CREATE_RECT":
              objects.put(String.valueOf(UUID.randomUUID()), new HashMap<>(){{
                put("type", "rect");
              }});
              break;
            default:
              break;
          }
      } catch (JsonProcessingException e) {
          throw new RuntimeException(e);
      }
  }

  public static void renderObjects() {
    objects.forEach((key, item) -> {
      String type = item.get("type");
      switch (type) {
        case "rect":
          DrawRectangle(0, 0, 100, 100, VIOLET);
          break;
        default:
          break;
      }
    });
  }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
class Event {
  private String type;
}