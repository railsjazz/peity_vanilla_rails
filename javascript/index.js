import peity from "peity-vanilla";

function domReady() {
  return new Promise((resolve) => {
    if (document.readyState == "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
}

const getPeityType = (node) => node.getAttribute("peity");

const elementFromNode = (node) => {
  if (node.nodeType == Node.ELEMENT_NODE) {
    return node;
  }
};

const processNodeAdded = (node) => {
  if (node.matches("[peity]")) {
    peity(node, getPeityType(node));
  }
};

const processNodeRemoved = (node) => {
  if (node._peity) {
    node._peity.destroy();
  }
};

const processAttributeChanged = (mutation) => {
  const node = mutation.target;
  switch (mutation.attributeName) {
    case "peity":
      const type = getPeityType(node);
      if (type) {
        peity(node, type);
      } else {
        node._peity.unmount();
      }
      break;
    case "data-peity":
      if (node._peity) {
        peity(node, node._peity.type);
      }
      break;
  }
};

const callback = (mutationList, observer) => {
  mutationList.forEach(function (mutation) {
    switch (mutation.type) {
      case "childList":
        for (const node of Array.from(mutation.addedNodes)) {
          const element = elementFromNode(node);
          if (element) {
            processNodeAdded(element);
          }
        }
        for (const node of Array.from(mutation.removedNodes)) {
          const element = elementFromNode(node);
          if (element) {
            processNodeRemoved(element);
          }
        }
        break;
      case "attributes":
        processAttributeChanged(mutation);
        break;
    }
  });
};

const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
};

const start = async () => {
  await domReady();

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, observerOptions);

  for (const node of Array.from(document.documentElement.querySelectorAll("[peity]"))) {
    processNodeAdded(node);
  }
};

start();

export * from "peity-vanilla";
export default peity;
