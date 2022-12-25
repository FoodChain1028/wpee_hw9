const makeName = (x, y) => {
    return [x, y].sort().join('_');
}

const Subscription = {
    message: {
      subscribe: (parent, { from, to }, { pubSub }) => {
        const chatBoxName = makeName(from, to);
        return pubSub.subscribe(`chatBox ${chatBoxName}`);
  }, },
};

export {Subscription as default};