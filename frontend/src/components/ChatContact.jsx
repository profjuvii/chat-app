import "../styles/ChatContact.css";

const ChatContact = ({ name, text, active, onClick }) => {
  return (
    <div
      className={`contact--chats ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
};

export default ChatContact;
