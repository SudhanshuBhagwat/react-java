class RectElement {
  constructor(eventBridge, props) {
    this.eventBridge = eventBridge;
    this.props;

    this.eventBridge.sendMessage(JSON.stringify({
      event: "CREATE_RECT",
      element: {
        type: "rect",
        props
      }
    }))
  }
}

export default RectElement;
