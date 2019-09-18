import FetchData from "./FetchData";
const uri =
  "https://croitorielarodica.netlify.com/.netlify/functions/express/mongoose";
// const uri = "http://localhost:8888/.netlify/functions/express/mongoose";
// const uri = "http://localhost:9000/.netlify/functions/express/mongoose";

const LOGIN = action => async dispatch => {
  let { loggedInUser, user_password } = action.payload;
  FetchData(
    {
      action: "GetUserForLogin",
      payload: { user_name: loggedInUser, password: user_password }
    },
    uri
  ).then(user => {
    const { isError, data } = user.payload;
    // console.log(data.payload);
    if (isError) {
      dispatch({
        action: "LOGIN",
        payload: {
          loggedInUser: loggedInUser,
          user_password,
          login_msg: {
            type: "LOGIN",
            success: false,
            msgColor: "#e74c3c",
            msgText: data
          }
        }
      });
    } else {
      const newState = {
        action: "LOGIN",
        payload: {
          ...data,
          login_msg: {
            type: "LOGIN",
            success: true,
            msgColor: "#3498db",
            msgText: "Logare cu Succes"
          }
        }
      };
      dispatch(newState);
    }
  });
};

function LOGOUT(state) {
  // window.sessionStorage.removeItem("state");
  return { loggedInUser: "", user_password: "" };
}

const GetHomeCaroselData = () => async dispatch => {
  dispatch({
    action: "GetHomeCaroselData",
    payload: {
      HomeCarosel: { loading: true, requestedData: true }
    }
  });
  FetchData(
    { action: "GetHomeCaroselData", payload: "GetHomeCaroselData" },
    uri
  )
    .then(data => {
      dispatch({
        action: "GetHomeCaroselData",
        payload: {
          HomeCarosel: {
            loading: false,
            caroselData: data.payload,
            requestedData: true
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        action: "GetHomeCaroselData",
        payload: {
          HomeCarosel: { loading: false, caroselData: error }
        }
      });
    });
};
const GetPostsData = payload => async dispatch => {
  //posts count Number and allposts: boolean
  //const { count, allPosts } = payload;
  dispatch({
    action: "GetPostsData",
    payload: {
      Posts: {
        loading: true,
        requestedData: true,
        postsRequcestedCount: payload.count
      }
    }
  });
  FetchData(
    {
      action: "GetPostsData",
      payload
    },
    uri
  )
    .then(data => {
      // console.log("Fetch response: " + data);
      // console.log(data.payload);
      dispatch({
        action: "GetPostsData",
        payload: {
          Posts: {
            loading: false,
            postsData: data.payload.posts,
            requestedData: true,
            postsRequestedCount: payload.count
          },
          comments: {
            commentsData: data.payload.comments
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        action: "GetPostsData",
        payload: {
          Posts: {
            loading: false,
            postsData: error,
            requestedData: true,
            postsRequestedCount: payload.count
          }
        }
      });
    });
};

const LikeAPostUpdate = (likeObj, likeCount) => async dispatch => {
  // let likeObj = {
  //   post_id: thisPostId,
  //   users_who_liked_this_post: userWhoClicked
  // };
  // { likes: data.payload.likes }
};

export {
  LOGIN,
  LOGOUT,
  GetHomeCaroselData,
  GetPostsData,
  uri,
  LikeAPostUpdate
};
