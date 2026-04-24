let nextId = 1;

class RectElement {
  constructor(eventBridge, props) {
    this.eventBridge = eventBridge;
    this.props = props;
    this.id = String(nextId++);

    this.eventBridge.sendMessage(JSON.stringify({
      event: "CREATE_RECT",
      id: this.id,
      element: { type: "rect", props }
    }));
  }
}

export default RectElement;
