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

const queryPeityElements = (node) => Array.from(node.querySelectorAll("[peity]"));

const getPeityType = (node) => node.getAttribute("peity");

const elementFromNode = (node) => {
  if (node.nodeType == Node.ELEMENT_NODE) {
    return node;
  }
};

class Watcher {
  constructor() {
    this.elements = new Set();
  }

  async start() {
    await domReady();

    this.element = document.documentElement;

    const observer = new MutationObserver(this.callback.bind(this));
    observer.observe(this.element, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    this.processNodeAdded(this.element);
  };

  processNodeAdded(node) {
    for (const element of queryPeityElements(node)) {
      if (!this.elements.has(element)) {
        this.elements.add(element)
        peity(element, getPeityType(element));
      }
    }
  };

  processNodeRemoved(node) {
    const matches = new Set(queryPeityElements(node));

    for (const element of this.elements) {
      if(matches.has(element)) {
        this.elements.delete(element);
        if (element._peity) {
          element._peity.destroy();
        }
      }
    }
  };

  processAttributeChanged(mutation) {
    const node = mutation.target;
    if(!this.elementIsActive(node)) return;

    switch (mutation.attributeName) {
      case "peity":
        const type = getPeityType(node);
        if (type) {
          if (!this.elements.has(node)) {
            this.elements.add(node)
          }
          peity(node, type);
        } else {
          if (this.elements.has(node)) {
            this.elements.delete(node);
            if (node._peity) {
              node._peity.destroy();
            }
          }
        }
        break;
      case "data-peity":
        if (node._peity) {
          peity(node, node._peity.type);
        }
        break;
    }
  }

  callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
      switch (mutation.type) {
        case "childList":
          for (const node of Array.from(mutation.removedNodes)) {
            const element = elementFromNode(node);
            if (element) {
              this.processNodeRemoved(element);
            }
          }
          for (const node of Array.from(mutation.addedNodes)) {
            const element = elementFromNode(node);
            if (element && this.elementIsActive(element)) {
              this.processNodeAdded(element);
            }
          }
          break;
        case "attributes":
          this.processAttributeChanged(mutation);
          break;
      }
    });
  };

  elementIsActive(element) {
    return this.element.contains(element);
  }
}

new Watcher().start();

export * from "peity-vanilla";
export default peity;
