import React, { useState, useRef, useLayoutEffect } from "react";
import "./App.css";
import MemoList from "./components/MemoList";
import UpdateArea from "./components/UpdateArea";

function App() {
  const [id, setId] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [contents, setContents] = useState([]);
  const [textST, setTextST] = useState("");
  const [onMemo, setOnMemo] = useState(false);
  const [mode, setMode] = useState(false);
  const CreateInput = useRef();
  const [editTodo, setEditTodo] = useState("");
  const [targetId, setTargetId] = useState(0);

  /* Create */

  //게시글을 생성한다
  function updateControl() {
    const newContents = [...contents];
    const newContent = { id: nextId, text: textST };
    newContents.push(newContent);
    setContents(newContents);
    setId(nextId);
    setNextId(nextId + 1);
    setOnMemo(false);
    ResetText();
  }

  //input의 문자 감지
  function texting(e) {
    e.preventDefault();
    setTextST(e.target.value);
  }

  //input의 엔터키 감지하여 클릭과 동일하게 동작
  function OnKeyPress(e) {
    if (e.key === "Enter") {
      updateControl();
    }
  }

  //input에 입력된 값을 빈문자열로 초기화
  function ResetText() {
    CreateInput.current.value = ""; //보이는 부분 초기화
    setTextST(""); //state 부분 초기화
  }

  /* Update */

  //클릭한 버튼의 id값을 감지하여 state 변화
  function TargetId(e) {
    setTargetId(e.target.id);
  }

  //팝업창을 열고 닫는 스위치 함수
  function editPopUp() {
    mode === true ? setMode(false) : setMode(true);
  }

  //수정하기 팝업창에 target의 text를 가져오는 함수
  function EditTargetText(e) {
    setEditTodo(contents[Number(e.target.id) - 1].text);
  }

  //수정하기 완료버튼
  function CreateBtnClick(e) {
    let id = Number(e.target.id);
    const newContent = { id: id, text: e.target[0].value };
    let newContents = [];
    newContents = [
      ...contents.slice(0, id - 1),
      newContent,
      ...contents.slice(id),
    ];
    setContents(newContents);
  }

  //수정하기 팝업창에 완료버튼 2가지 함수를 한번에 실행
  function handleSubmit(e) {
    e.preventDefault();
    CreateBtnClick(e);
    editPopUp();
  }

  /* Delete */

  //삭제버튼
  function handleDelete(e) {
    let id = Number(e.target.id);
    const newContents = contents.filter(content => content.id !== id);
    setContents(newContents);
  }

  /* focus, id 재할당 */
  useLayoutEffect(() => {
    let resetId = 1;
    CreateInput.current.focus();
    contents.map(content => (content.id = resetId++));
    setNextId(resetId);
  }, [contents, nextId]);

  return (
    <div className="App">
      <div className="outLine">
        <h1 className="title">가입 인사 게시판</h1>
        {mode === true ? (
          <UpdateArea
            editTodo={editTodo}
            targetId={targetId}
            contents={contents}
            handleSubmit={handleSubmit}
          />
        ) : null}
        <fieldset className="InputBox">
          <div className="input_area">
            <input
              className="InputText"
              placeholder="내용을 입력해주세요"
              onChange={texting}
              onKeyPress={OnKeyPress}
              ref={CreateInput}
              maxLength="117"
            />
            <div className="set_attach">
              <button
                className="btn"
                onClick={() => {
                  updateControl();
                }}
              >
                메모
              </button>
            </div>
          </div>
        </fieldset>
        <MemoList
          contents={contents}
          TargetId={TargetId}
          handleDelete={handleDelete}
          EditTargetText={EditTargetText}
          updateControl={updateControl}
          editPopUp={editPopUp}
        ></MemoList>
      </div>
    </div>
  );
}

export default App;
