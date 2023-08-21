const replacements = ["Twitter", "twitter", "TWITTER", "ツイッター", "ツイッタ", "ついったー", "ついった", "とぃったー"];
const replaced = "𝕏";
// const replaced = "X";

window.addEventListener("load", function () {
  function replaceTextInNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.textContent;
      let newText = originalText;

      for (const replacement of replacements) {
        const regex = new RegExp(replacement, "g");
        newText = newText.replace(regex, replaced);
      }

      if (newText !== originalText) {
        const replacementSpan = document.createElement("span");
        replacementSpan.textContent = newText;
        replacementSpan.className = "replacement-text";
        node.parentNode.insertBefore(replacementSpan, node);
        node.remove();
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const childNode of node.childNodes) {
        replaceTextInNode(childNode);
      }
    }
  }

  const allNodes = document.getElementsByTagName("*");
  for (const node of allNodes) {
    replaceTextInNode(node);
  }

  const replacementElements = document.querySelectorAll(".replacement-text");
  replacementElements.forEach(element => {
    setTimeout(() => {
      element.classList.add("visible");
    }, 200);
  });
});