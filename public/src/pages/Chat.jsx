import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../context/ChatContext";
import "../styles/Chat.css";

const Chat = () => {
  const textareaRef = useRef(null);
  const [input, setInput] = useState("");
  const { activeUser, messages, sendMessage } = useChat();

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  if (!activeUser?.name) {
    return (
      <div className="empty--chat">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="win--chat">
      <div className="top-panel--chat">
        <h3>{activeUser.name}</h3>
        <p className={activeUser.online ? "blue" : ""}>
          {activeUser.online ? "online" : "offline"}
        </p>
      </div>

      <div className="main--chat">
        {messages.map((m) => (
          <div key={m.id || m.text} className={`msg ${m.who}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="bottom-panel--chat">
        <div
          className="input-field--chat"
          onClick={() => textareaRef.current?.focus()}
        >
          <textarea
            ref={textareaRef}
            name="input"
            id="input-text"
            placeholder=" "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <label htmlFor="input-text">Write new message...</label>
        </div>
        <button onClick={handleSend}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
