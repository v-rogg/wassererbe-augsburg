import hotkeys from "hotkeys-js";

export function hotkey(node) {
  const hotkey = node.getAttribute("hotkey");

  hotkeys(hotkey, (event, handler) => {
    event.preventDefault();
    node.dispatchEvent(new Event("click"));
  });

  return {
    destroy() {
      hotkeys.unbind(hotkey);
    },
  };
}
