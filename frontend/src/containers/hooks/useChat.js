import { useState, useEffect, useContext, createContext } from "react";
import { message } from "antd";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";

// for local storage user names
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    friend: "",
    signedIn: false,
    messages: [],
    setMessages: () => {},
    setFriend: () => {},
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    // data: {},
    getData: {},
    loading: false,
    subscribe: () => {},
    subscribeToMore: () => {},

});

const ChatProvider = (props) => {
    // define states
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);
    const [signedIn, setSignedIn] = useState(false); 
    const [me, setMe] = useState( savedMe || '');
    const [friend, setFriend] = useState('');

    // const [getChatBox, {data_2}] = useLazyQuery()
    const { data: getData, loading, error, subscribeToMore } = useQuery( CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend
        },
    }); 
    const displayStatus = (payload) => {
        if (payload.msg) {
          const {type, msg} = payload;
          const content = {
            content: msg, 
            duration: 0.5
          }
          switch (type) {
            case 'success':
              message.success(content)
              break
            case 'error':
            default:
              message.error(content)
              break;
      }}}

    const [getChatBox, payload] = useLazyQuery(CHATBOX_QUERY);
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const [lastData, setLastData] = useState({});
    
    const makeName = (x, y) => {
        return [x, y].sort().join('_');
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me)
        }
    }, [me, signedIn]);

    const subscribe = () => {
        subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { from: me, to: friend },
            updateQuery: (prev, { subscriptionData }) => {
                console.log("SUBSCRIBE!!!!!!!!!!!!!!");
                console.log(me, friend);
                console.log(subscriptionData);

                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.message;
                const chatBoxName = makeName(me, friend); 
                return ({
                    chatBox: {
                        name: chatBoxName,
                        messages: [...prev.chatBox.messages, newMessage],
                    }
                        
                });
            },
        });
    }
    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log("SUBSCRIBE!!!!!!!!!!!!!!");
                    console.log(me, friend);
                    console.log(subscriptionData);

                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    const chatBoxName = makeName(me, friend); 
                    return Object.assign({
                        chatBox: {
                            // name: chatBoxName,
                            messages: [...prev.chatBox.messages, newMessage],
                        },
                    });
                },
            });
        } catch (e) {}
    }, [subscribeToMore]);

    return (
        <ChatContext.Provider
            value={{
                status,
                me,
                friend,
                signedIn,
                messages,
                setFriend,
                setMessages,
                setMe,
                setSignedIn, 
                sendMessage,
                startChat,
                displayStatus,
                // data,
                getData,
                loading,
                subscribe,
                subscribeToMore,

            }} 
            {...props}
        />
    )
}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };