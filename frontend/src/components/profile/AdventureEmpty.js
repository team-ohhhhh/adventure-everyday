import style from "./AdventureEmpty.module.css";
import { BsPlusCircle } from "react-icons/bs";

const AdventureEmpty = function ({ text, isMe }) {
  return (
    <div className={style.banner}>
      {isMe ? (
        <>
          <div className={style.text}>{text}</div>
          <BsPlusCircle className={style.plus} />
        </>
      ) : (
        <div className={style.text}>앗! 아직 없어요!</div>
      )}
    </div>
  );
};

export default AdventureEmpty;
