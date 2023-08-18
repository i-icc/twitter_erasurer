const replacements = [
  { find: "twitter", replace: "A" },
  { find: "Twitter", replace: "B" },
];

function replaceText(element) {
  replacements.forEach(replacement => {
    element.textContent = element.textContent.replace(replacement.find, replacement.replace);
  });
}

function observeMutations() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const elements = node.querySelectorAll("*:not(script):not(style)"); // スクリプトやスタイル要素を除外
          // console.log(elements);
          elements.forEach(element => {
            console.log(element);
            replaceText(element);
          });
        }
      });
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
}

// Mutation Observerを開始
observeMutations();
