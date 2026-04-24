package com.bhagwat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.raylib.Colors.BLACK;
import static com.raylib.Colors.VIOLET;
import static com.raylib.Raylib.*;

public class App {
  private static final Logger logger = LoggerFactory.getLogger(App.class);
  private static final ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<>();
  private static final ConcurrentHashMap<String, Element> objects = new ConcurrentHashMap<>();
  static ObjectMapper objectMapper;

  public App() {
    objectMapper = new ObjectMapper();
    objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
  }

  public static void main(String[] args) {
    logger.info("Starting App...");
    App app = new App();
    app.run();
  }

  public void run() {
    new Thread(() -> {
      logger.info("Starting Java event message thread...");
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
          switch (event.getEvent()) {
            case "CREATE_RECT":
              objects.put(event.getId(), event.getElement());
              break;
            case "UPDATE_RECT":
              objects.put(event.getId(), event.getElement());
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
      String type = item.getType();
      switch (type) {
        case "rect":
          DrawRectangle(
                  ((Number) item.getProps().get("x")).intValue(),
                  ((Number) item.getProps().get("y")).intValue(),
                  ((Number) item.getProps().get("w")).intValue(),
                  ((Number) item.getProps().get("h")).intValue(),
                  VIOLET
          );
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
  private String event;
  private String id;
  private Element element;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
class Element {
  private String type;
  private Map<String, Object> props;
}