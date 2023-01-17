export default function Create(props) {
  return (
    <fieldset className="InputBox">
      <div className="input_area">
        <input
          className="InputText"
          placeholder="내용을 입력해주세요"
          onChange={props.texting}
          onKeyPress={props.OnKeyPress}
          ref={props.CreateInput}
          maxLength="117"
        />
        <div className="set_attach">
          <button
            className="btn"
            onClick={() => {
              props.updateControl();
            }}
          >
            메모
          </button>
        </div>
      </div>
    </fieldset>
  );
}
