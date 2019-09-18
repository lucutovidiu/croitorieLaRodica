export default function Reducer(state, { action, payload }) {
  // console.log("reducer state: ", state);
  switch (action) {
    case "LOGIN": {
      let newState = { ...state, user_data: { ...payload } };
      window.sessionStorage.setItem("state", JSON.stringify(newState));
      return newState;
    }
    case "LOGOUT": {
      let obj = JSON.parse(window.sessionStorage.getItem("state"));
      let newObj = {
        ...obj,
        user_data: {},
        selectedActiveModalPost: { _id: null }
      };
      window.sessionStorage.setItem("state", JSON.stringify(newObj));
      // console.log(newObj);
      return newObj;
    }
    case "GetHomeCaroselData": {
      let newState = { ...state, ...payload };
      window.sessionStorage.setItem("state", JSON.stringify(newState));
      return newState;
    }
    case "GetPostsData": {
      let newState = { ...state, ...payload };
      // console.log("postsdata", newState);
      window.sessionStorage.setItem("state", JSON.stringify(newState));
      return newState;
    }
    case "LikeAndCommentUpdate": {
      // let visibility = JSON.parse(window.sessionStorage.getItem("state"))
      //   .selectedActiveModalPost;
      // console.log("selected component", state.selectedActiveModalPost);
      // let origianlPost = state.Posts.postsData.filter(
      //   post => post._id === payload._id
      // );

      // let allposts = state.Posts.postsData.filter(
      //   post => post._id !== payload._id
      // );
      // let PostObj = { ...state.Posts, postsData: [...allposts, payload] };
      // let stateObj = { ...state, Posts: { ...PostObj } };

      window.sessionStorage.setItem("state", JSON.stringify(payload));
      // console.log(payload);
      // return payload;
      return payload;
      // console.log(state.Posts.postsData.find(item => item._id === payload._id));
      // let updatedPosts = {
      //   ...state.Posts.postsData,
      //   payload
      // };
      // console.log(updatedPosts);
      // return{
      //   ...state,
      //   state.Posts:updatedPosts
      // }
    }
    case "CloseSelectedActivePost": {
      console.log("unmounted");
      let newState = {
        ...state,
        selectedActiveModalPost: { _id: null }
      };
      window.sessionStorage.setItem("state", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
