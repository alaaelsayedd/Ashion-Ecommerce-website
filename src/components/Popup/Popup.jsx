import "./popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="prop-up">
      <div
        className={`inner-prop shadow-lg border p-10 w-1/3 ${
          props.closePopup ? "closepopup" : "open-pop-up"
        }`}
      >
        <button className="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => props.close()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
