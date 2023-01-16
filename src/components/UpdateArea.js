export default function UpdateArea(props) {
  return (
    <div className={"update_area"}>
      <form
        className={"update_input_container"}
        id={props.targetId}
        onSubmit={props.handleSubmit}
      >
        <input
          type="text"
          className="update_input"
          defaultValue={props.editTodo}
          maxLength="117"
        />
        <button className="update_btn_off">완료</button>
      </form>
    </div>
  );
}
