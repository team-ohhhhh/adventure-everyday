import "./AntennaBtn.css";
function AntennaBtn(props) {
  return (
    <>
      <button
        className="AntennaBtn"
        onClick={() => {
          props.setIsOn();
        }}
      >
        <img src={"images/antennaBtn.png"}></img>
      </button>
    </>
  );
}

export default AntennaBtn;
