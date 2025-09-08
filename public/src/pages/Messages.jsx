import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPlus,
  faArrowRightFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Messages.css";
import ChatContact from "../components/ChatContact.jsx";
import NewContact from "../components/NewContact.jsx";
import { useChat } from "../context/ChatContext.jsx";

const loadChats = [
  {
    name: "John",
    messages: [
      { who: "friend", text: "What's up?" },
      { who: "me", text: "Not much, you?" },
    ],
  },
  {
    name: "Emma",
    messages: [{ who: "friend", text: "Got it, thank you!" }],
  },
  {
    name: "Josh",
    messages: [{ who: "friend", text: "Learn JavaScript and React" }],
  },
];

const loadNew = [{ name: "John" }, { name: "Emma" }, { name: "Josh" }];

function Messages() {
  const [chats, setChats] = useState(loadChats);
  const [newContacts, setNewContacts] = useState(loadNew);
  const [chatsMode, setChatsMode] = useState(true);
  const navigate = useNavigate();
  const { selectUser } = useChat();

  const clickButtonHandler = (e) => {
    const name = e.currentTarget.dataset.name;
    if (name === "logout") return navigate("/login");
    if (name === "chats") return setChatsMode(true);
    setChatsMode(false);
  };

  const clickChatHandler = (chat) => {
    selectUser({
      name: chat.name,
      online: true,
      messages: chat.messages || [],
    });

    setChats((prev) =>
      prev.map((c) =>
        c.name === chat.name ? { ...c, active: true } : { ...c, active: false }
      )
    );
    navigate("/chat");
  };

  const removeNewContact = (name) => {
    setNewContacts((prev) => prev.filter((contact) => contact.name !== name));
  };

  const clickNewHandler = (name) => {
    const remove = () => {
      removeNewContact(name);
    };

    const add = () => {
      removeNewContact(name);
    };

    return [add, remove];
  };

  return (
    <div className="win--messages">
      <div className="top-panel--messages">
        <h1>Messages</h1>

        <div className="search-bar-field">
          <label htmlFor="search-bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>

          <input
            type="search"
            name="search-bar"
            id="search-bar"
            placeholder={chatsMode ? "Search chats..." : "Find new friends..."}
          />
        </div>
      </div>

      <div className="main--messages">
        {chatsMode
          ? chats.map((chat) => (
              <ChatContact
                key={chat.name}
                name={chat.name}
                text={chat.messages[chat.messages.length - 1].text}
                active={chat.active}
                onClick={() => clickChatHandler(chat)}
              />
            ))
          : newContacts.map(({ name }) => (
              <NewContact
                key={name}
                name={name}
                onClick={() => clickNewHandler(name)}
              />
            ))}
      </div>

      <div className="bottom-panel--messages">
        <button
          className={!chatsMode ? "active" : ""}
          data-name="new"
          onClick={clickButtonHandler}
        >
          <FontAwesomeIcon icon={faPlus} />
          <p>New</p>
        </button>

        <button
          className={chatsMode ? "active" : ""}
          data-name="chats"
          onClick={clickButtonHandler}
        >
          <FontAwesomeIcon icon={faMessage} />
          <p>Chats</p>
        </button>

        <button data-name="logout" onClick={clickButtonHandler}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}

export default Messages;
