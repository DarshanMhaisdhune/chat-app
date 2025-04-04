import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ChatContextType {
    roomId: string,
    setRoomId: Dispatch<SetStateAction<string>>,
    currentUser: string,
    setCurrentUser: Dispatch<SetStateAction<string>>,
    connected: boolean,
    setConnected: Dispatch<SetStateAction<boolean>>,
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

    const [roomId, setRoomId] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);

    return (
        <ChatContext.Provider
            value={{ roomId, setRoomId, currentUser, setCurrentUser, connected, setConnected }}
        >
            {children}
        </ChatContext.Provider>
    )

}

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context){
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
}