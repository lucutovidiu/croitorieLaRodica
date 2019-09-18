import React from "react";
import moment from "moment";

const LeftComments = ({ img_src }) => {
  // console.log(img_src);
  // const { user_img } = img_src.user_who_commented;
  const { user_img_src } = img_src.user_who_commented;
  const { comment_text } = img_src;
  const comment_date = moment(img_src.comment_date).format(
    "DD-MM-YYYY HH:mm:ss"
  );
  const first_name =
    img_src.user_who_commented.first_name +
    " " +
    img_src.user_who_commented.last_name;
  const UserImgForComment = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    float: "left"
  };
  return (
    <div className="mt-4" style={{ display: "inline-block" }}>
      <img
        className="user-comment-img img-fluid mt-1 ml-1"
        src={user_img_src}
        alt="user"
        style={UserImgForComment}
      />
      <div className="pl-3 " style={{ float: "left", textAlign: "left" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "0.7rem"
          }}
        >
          {first_name}
        </div>
        <div
          style={{
            fontSize: "0.7rem",
            color: "gray"
          }}
        >
          {comment_date}
        </div>
        <div>{comment_text}</div>
      </div>
      <div style={{ display: "table", clear: "both" }} />
    </div>
  );
};

export default LeftComments;
