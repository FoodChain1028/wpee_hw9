import { ChatBoxModel } from "../models/chatbox";

const makeName = (x, y) => {
    return [x, y].sort().join('_');
}

const checkOutChatBox = async (name1, name2) => {
    const name = makeName(name1, name2);
    console.log(name);
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
        box = await new ChatBoxModel({ name }).save();
    return box
}

const Mutation = {
    createChatBox: async (parent, {name1, name2}) => {
        return await checkOutChatBox(name1, name2);
    },
    
    createMessage: async (parent, { from, to, body }, { pubSub } ) => {
        const chatBox = await checkOutChatBox(from, to);
        const newMsg = { sender: from, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();
        const chatBoxName = makeName(from, to);
        pubSub.publish(`chatBox ${chatBoxName}`, 
            { message: newMsg }
        );
        return newMsg;
    }
}

export { Mutation as default }
