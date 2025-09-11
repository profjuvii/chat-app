import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/NewContact.css";

const ChatContact = ({ name, onClick }) => {
  const [add, remove] = onClick();

  return (
    <div className="contact--new" onClick={onClick}>
      <h3>{name}</h3>

      <div className="buttons--new">
        <button onClick={add}>
          <FontAwesomeIcon icon={faPlus} />
          <p>Add</p>
        </button>
        <button className="red" onClick={remove}>
          <FontAwesomeIcon icon={faXmark} />
          <p>Remove</p>
        </button>
      </div>
    </div>
  );
};

export default ChatContact;
