import React, { Children } from "react";

export default function MemoList(props) {
  // 게시글의 작성일을 나타내는 함수
  let Today = getToday();
  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  return (
    <div className="contents_list_section">
      {Children.toArray(
        props.contents.map(contents => (
          <>
            <div className="user_info">
              <div className="user_name">user name</div>
              <div className="user_time">{Today}</div>
              <div className={"user_texted"}>{contents.text}</div>
            </div>

            <button
              href={"/" + contents.id}
              className="update_btn"
              id={contents.id}
              onClick={e => {
                e.preventDefault();
                props.editPopUp();

                props.TargetId(e);
                props.EditTargetText(e);
              }}
            >
              수정
            </button>
            <button
              href={"/" + contents.id}
              className="delete_btn"
              id={contents.id}
              onClick={e => {
                console.log("삭제버튼 클릭 감지됨");
                e.preventDefault();
                props.TargetId(e);
                props.handleDelete(e);
              }}
            >
              삭제
            </button>
          </>
        ))
      )}
    </div>
  );
}
