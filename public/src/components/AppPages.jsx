import { useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile.jsx";
import "../styles/AppPages.css";
import Messages from "../pages/Messages.jsx";
import Chat from "../pages/Chat.jsx";
import { ChatProvider } from "../context/ChatProvider.jsx";

function DesktopChatWrapper() {
  return (
    <div className="full-app-page">
      <Messages />
      <Chat />
    </div>
  );
}

function AppPages() {
  const location = useLocation();
  const isMobile = useIsMobile();

  const routes = {
    "/messages": <Messages />,
    "/chat": <Chat />,
  };

  return (
    <ChatProvider>
      {isMobile ? routes[location.pathname] : <DesktopChatWrapper />}
    </ChatProvider>
  );
}

export default AppPages;
