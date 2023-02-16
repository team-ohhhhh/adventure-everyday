import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Reply from "./Reply";
import InputForm from "./InputForm";

function ReplyList({
  commentId,
  replyList,
  getReply,
  replyMoreButtonOpen,
  setReplyMoreButtonOpen,
  whichReplyButton,
  setWhichReplyButton,
}) {
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  // 대댓글 작성용
  const [replyInput, setReplyInput] = useState();
  const postReply = function () {
    axios({
      url: URL + `/posts/comments/${commentId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        content: replyInput,
      },
    })
      .then((res) => {
        getReply();
        setReplyInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        {replyList.map((reply) => {
          return (
            <Reply
              key={reply.subCommentId}
              reply={reply}
              getReply={getReply}
              replyMoreButtonOpen={replyMoreButtonOpen}
              setReplyMoreButtonOpen={setReplyMoreButtonOpen}
              whichReplyButton={whichReplyButton}
              setWhichReplyButton={setWhichReplyButton}
            />
          );
        })}
      </div>

      <div style={{ marginTop: "1rem", marginLeft: "2rem" }}>
        <InputForm
          setCommentInput={setReplyInput}
          commentInput={replyInput}
          postComment={postReply}
        />
      </div>
    </>
  );
}

export default ReplyList;
