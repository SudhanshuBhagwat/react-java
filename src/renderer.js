import { JReconciler } from "./reconciler";

export default function render(reactEl) {
  const container = { type: "ROOT" };
  const root = JReconciler.createContainer(
    container, 
    0,
    null,
    false,
    null,
    "",
    (err) => console.error("Recoverable error:", err),
    null
  );

  JReconciler.updateContainer(reactEl, root, null, () => {
    console.log("Render complete");
  });
}
