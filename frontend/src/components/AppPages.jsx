import { useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { ChatProvider } from "../context/ChatProvider";
import "../styles/AppPages.css";
import Messages from "../pages/Messages";
import Chat from "../pages/Chat";

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
