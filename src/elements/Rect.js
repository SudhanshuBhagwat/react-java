class RectElement {
  constructor(eventBridge) {
    this.eventBridge = eventBridge;
    this.eventBridge.sendMessage(JSON.stringify({
      type: "CREATE_RECT"
    }))
  }
}

export default RectElement;
