//npm run start:lambda

const express = require("express");
const serverless = require("serverless-http");
const app = express();
require("dotenv").config();
// const fs = require("fs");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

const Schema = mongoose.Schema;
// mongoose.set("useCreateIndex", true);
const uri = process.env.REACT_APP_GMAIL_MONGO_URI;
// console.log("URI", uri);
const options = {
  // promiseLibrary: global.Promise,
  useNewUrlParser: true
};
mongoose.connect(uri, options);
let db = mongoose.connection;
mongoose.pluralize(null);
db.on("error", function(err) {
  console.log(err);
});
db.once("open", function() {
  console.log("connected to mongo db");
});
// schema

const Carosel = mongoose.model(
  "HomeCarosel",
  new Schema({
    //_id: mongoose.Types.ObjectId,
    src: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    addedOn: { type: Date, default: Date.now() }
  })
);

const OrderAddress = mongoose.model(
  "OrderAddress",
  new Schema({
    street_name: { type: String, required: true },
    street_number: { type: Number, required: true },
    town: { type: String, required: true },
    county: { type: String, required: true },
    country: { type: String, required: true, default: "Romania" }
  })
);

const Order = mongoose.model(
  "Orders",
  new Schema({
    //_id: mongoose.Types.ObjectId,
    user_who_ordered: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    ordered_articles: [
      { type: Schema.Types.ObjectId, ref: "Articles", required: true }
    ],
    order_address: {
      type: Schema.Types.ObjectId,
      ref: "OrderAddress",
      required: true
    },
    order_user_extra_info: String,
    order_date: { type: Date, default: Date.now() },
    order_status: { type: Schema.Types.ObjectId, ref: "OrderStatus" },
    order_status_details: String
  })
);

const OrderStatus = mongoose.model(
  "OrderStatus",
  new Schema({
    //_id: mongoose.Types.ObjectId,
    status_name: {
      type: String,
      uppercase: true,
      unique: true,
      required: true
    },
    addedOn: { type: Date, default: Date.now() }
  })
);

const UnitatiMasuraPetruPreturi = mongoose.model(
  "UnitatiMasuraPetruPreturi",
  new Schema({
    //_id: mongoose.Types.ObjectId,
    unitate_masura: {
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },
    addedOn: {
      type: Date,
      default: Date.now()
    }
  })
);

const ArticleSchema = new Schema({
  //_id: mongoose.Types.ObjectId,
  article_tile: { type: String, required: true, uppercase: true },
  article_description: { type: String },
  price: Number,
  pret_unitate_masura: {
    type: Schema.Types.ObjectId,
    ref: "UnitatiMasuraPetruPreturi",
    required: true
  },
  quantity_left_on_stock: { type: Number, required: true, default: 0 },
  addedOn: {
    type: Date,
    default: Date.now()
  },
  cathegory: {
    type: Schema.Types.ObjectId,
    ref: "ArticleCategories",
    required: true
  },
  article_img_src: { type: String, required: true }
});
ArticleSchema.methods.getCategoryByNameOrID = function getCategoryByNameOrID(
  name
) {
  return this.model("ArticleCategories").findOne(name);
};
const Article = mongoose.model("Articles", ArticleSchema);

const ArticleCategory = mongoose.model(
  "ArticleCategories",
  new Schema({
    //_id: mongoose.Types.ObjectId,
    category_name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    addedOn: { type: Date, default: Date.now() }
  })
);

const PostSchema = new Schema({
  //_id: mongoose.Types.ObjectId,
  post_date: {
    type: Date,
    default: Date.now()
  },
  posted_article: {
    type: Schema.Types.ObjectId,
    ref: "Articles",
    required: true,
    unique: true
  },
  post_user_name: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    unique: false,
    required: true
  },
  likes: { type: Number, default: 0 },
  users_who_liked_this_post: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: false
    }
  ]
});
/*
{
post_id:"",
users_who_liked_this_post:""
}
*/
PostSchema.methods.giveLike = async function giveLike(user) {
  let findPost = await this.model("Posts").findOne({ _id: user.post_id });
  if (findPost.users_who_liked_this_post.length > 0) {
    let foundPostUser = findPost.users_who_liked_this_post.find(item => {
      // console.log("item", item);
      return String(item) === String(user.users_who_liked_this_post);
    });
    console.log("foundPostUser", foundPostUser);
    if (typeof foundPostUser !== "undefined") {
      return null;
    } else {
      findPost.users_who_liked_this_post.push({
        _id: user.users_who_liked_this_post
      });
      findPost.likes = findPost.likes + 1;
      let post = new Post(findPost);
      return post.save();
    }
  } else {
    findPost.likes = findPost.likes + 1;
    findPost.users_who_liked_this_post.push(user.users_who_liked_this_post);
    let post = new Post(findPost);
    return post.save();
  }
};

const Post = mongoose.model("Posts", PostSchema);

const CommentSchema = new Schema({
  //_id: mongoose.Types.ObjectId,
  comment_date: {
    type: Date,
    default: Date.now()
  },
  user_who_commented: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  post_id: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  comment_text: String
});
CommentSchema.methods.WriteACommentToCurrentPost = function WriteACommentToCurrentPost(
  currentPost
) {
  /*  
currentPost={
  post_id = props.props._id
  user_id = props.state.user_data._id
  comment_text = currentPost.comment_text
}
*/
  const newComment = {
    user_who_commented: currentPost.user_id,
    post_id: currentPost.post_id,
    comment_text: currentPost.comment_text
  };
  const newCommentObj = new Comment(newComment);
  let savedComm = newCommentObj.save();
  return savedComm;
};
const Comment = mongoose.model("Comments", CommentSchema);

const AccountTypes = new mongoose.model(
  "AccountTypes",
  new Schema({
    // id: Schema.Types.ObjectId,
    account_type: { type: String, unique: true, ref: "Users" },
    addedOn: { type: Date, default: Date.now() }
  })
);

const UserSchema = new mongoose.Schema({
  //_id: mongoose.Types.ObjectId,
  user_name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  gender: { type: String, required: true },
  user_img_src: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  last_succesfull_login: { type: Date, default: Date.now() },
  last_wrong_login_attempts: { type: Number, default: 0 },
  all_loggins: { type: Number, default: 0 },
  account_disabled: { type: Schema.Types.Boolean, default: false },
  account_type: { type: String, default: "User", ref: "AccountTypes" }
});
UserSchema.methods.activateAccount = async function activateAccount(data) {
  let user = await this.model("Users").findOne({ user_name: data.user_name });
  user.last_wrong_login_attempts = 0;
  user.account_disabled = false;
  user.save();
  return {
    payload: {
      isError: false,
      data: "User Activat"
    }
  };
};
UserSchema.methods.disableAccount = async function activateAccount(data) {
  let user = await this.model("Users").findOne({ user_name: data.user_name });
  user.last_wrong_login_attempts = 4;
  user.account_disabled = true;
  user.save();
  return {
    payload: {
      isError: false,
      data: "User Dezactivat"
    }
  };
};
UserSchema.methods.loginAttempt = async function loginAttempt(data) {
  let user = await this.model("Users").findOne({ user_name: data.user_name });
  if (user === null) {
    return {
      payload: {
        isError: true,
        data: "User Inexistent"
      }
    };
  } else {
    if (user.password === data.password) {
      // let user = new User({ user });
      if (user.account_disabled) {
        return {
          payload: {
            isError: true,
            data: "Cont Dezactivat Contactati laRodica@email.ro"
          }
        };
      } else {
        user.all_loggins = user.all_loggins + 1;
        user.last_wrong_login_attempts = 0;
        user.last_succesfull_login = Date.now();
        user.save();
        return {
          payload: { isError: false, data: { ...user._doc, password: "" } }
        };
      }
    } else {
      if (user.last_wrong_login_attempts === 4 || user.account_disabled) {
        user.account_disabled = true;
        user.save();
        return {
          payload: {
            isError: true,
            data:
              "Contul Dumneavostra a fost blocat pentru siguranta, contactati: LaRodica@email.ro"
          }
        };
      } else {
        user.last_wrong_login_attempts = user.last_wrong_login_attempts + 1;
        user.save();
        return {
          payload: {
            isError: true,
            data: `Ati introdus parola gresita mai aveti ${5 -
              user.last_wrong_login_attempts} incercari.`
          }
        };
      }
    }
  }
};
const User = mongoose.model("Users", UserSchema);

// schema end here

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

// var walkSync = function(dir, filelist) {
//   var fs = fs || require("fs"),
//     files = fs.readdirSync(dir);
//   filelist = filelist || [];
//   files.forEach(function(file) {
//     if (fs.statSync(dir + file).isDirectory()) {
//       filelist = walkSync(dir + file + "/", filelist);
//     } else {
//       filelist.push(file);
//     }
//   });
//   return filelist;
// };

/* de aici app use  */

app.use("/.netlify/functions/express/mongoose", (req, res) => {
  const { action, payload } = req.body;
  // console.log(req.body);
  switch (action) {
    case "sendMail": {
      console.log("request: send mail ", payload);
      SendEmail(payload)
        .then(d => res.send(d))
        .catch(e => res.send(e));
      break;
    }
    case "GetHomeCaroselData": {
      console.log("GetHomeCaroselData");
      GetHomeCaroselData().then(data => {
        res.header({
          "Content-Type": "application/json"
        });
        res.send(JSON.stringify(data));
      });
      break;
    }
    case "GetUserForLogin": {
      console.log("GetUserForLogin");
      const user = new User();
      user.loginAttempt({ ...req.body.payload }).then(data => res.send(data));
      break;
    }
    //"proxy": "https://croitorielarodica.netlify.com/.netlify/functions/",
    case "GetPostsData": {
      const { allPosts, count } = req.body.payload;
      // console.log("--**--GetPostsData:---" + allPosts, "---", count);
      GetPostsData(allPosts, count)
        .then(data => {
          // console.log("---****----POSTS DATA: ", data);
          res.send(data);
        })
        .catch(err => {
          console.log("GetPostsData Error: ", err);
        });
      break;
    }
    case "GetCategoriesList": {
      console.log("GetCategoriesList");
      GetCategoriesList().then(data => {
        // console.log(data);
        res.send({ payload: data });
      });
      break;
    }
    case "WriteACommentToCurrentPost": {
      console.log("WriteACommentToCurrentPost");
      /*
comment_text: "test"
post_id: "5d0ebfebf39fa00f58741b5d"
user_id: "5d0eca2fe8c965255869f576"
      */
      WriteACommentToCurrentPost(req.body.payload).then(data => {
        res.send({ payload: data });
      });
      break;
    }
    case "LikeAPost": {
      console.log("LikeAPost");
      LikeAPost(req.body.payload.likeObj)
        .then(data => {
          console.log(data);
          if (data !== null) {
            Post.findOne({ _id: data._id })
              .populate({
                path: "posted_article",
                populate: { path: "cathegory" }
              })
              .populate({
                path: "posted_article",
                populate: { path: "pret_unitate_masura" }
              })
              .populate({
                path: "users_who_liked_this_post",
                select: "first_name gender last_name user_img_src"
              })
              .populate({
                path: "post_user_name",
                select: "first_name gender last_name user_img_src"
              })
              .exec((err, posts) => {
                // console.log("sent:", data);
                res.send({ payload: posts });
              });
          } else res.send({ payload: data });
        })
        .catch(err => {
          console.log("error", err);
        });
      break;
    }
    default:
      res.send({ action: "CommandNotFound", payload: null });
  }
});
///pana aici app.use

async function GetHomeCaroselData() {
  return Carosel.find({}).then(data => {
    // console.log({ action: "GetHomeCaroselData", payload: data });
    return { action: "GetHomeCaroselData", payload: data };
  });
}

const GetPostsData = (allPosts, count) =>
  new Promise((resolve, reject) => {
    // console.log(allPosts, count);
    if (!allPosts) {
      Post.find({})
        .sort({ date: -1 })
        .limit(count)
        .populate({
          path: "posted_article",
          populate: { path: "cathegory" }
        })
        .populate({
          path: "posted_article",
          populate: { path: "pret_unitate_masura" }
        })
        .populate({
          path: "users_who_liked_this_post",
          select: "first_name gender last_name user_img_src"
        })
        .populate({
          path: "post_user_name",
          select: "first_name gender last_name user_img_src"
        })
        .exec((err, posts) => {
          Comment.find({})
            .sort({ date: -1 })
            .limit(count)
            .populate("post_id")
            .populate({
              path: "user_who_commented",
              select: "first_name gender last_name user_img_src"
            })
            .exec((err, comments) => {
              resolve({
                payload: { posts: [...posts], comments: [...comments] }
              });
            });
        });
    } else {
      Post.find({})
        .sort({ date: -1 })
        .populate({
          path: "posted_article",
          populate: { path: "cathegory" }
        })
        .populate({
          path: "posted_article",
          populate: { path: "pret_unitate_masura" }
        })
        .populate({
          path: "users_who_liked_this_post",
          select: "first_name gender last_name user_img_src"
        })
        .populate({
          path: "post_user_name",
          select: "first_name gender last_name user_img_src"
        })
        .exec((err, posts) => {
          Comment.find({})
            .sort({ date: -1 })
            .populate("post_id")
            .populate({
              path: "user_who_commented",
              select: "first_name gender last_name user_img_src"
            })
            .exec((err, comments) => {
              resolve({
                payload: { posts: [...posts], comments: [...comments] }
              });
            });
        });
    }
  });
function LikeAPost({ post_id, users_who_liked_this_post }) {
  const post = new Post();
  // let likeObj = {
  //   post_id: thisPostId,
  //   users_who_liked_this_post: userWhoClicked
  // };
  return post.giveLike({
    post_id,
    users_who_liked_this_post
  });
}
function GetCategoriesList() {
  return ArticleCategory.find({});
}

const WriteACommentToCurrentPost = commentObj =>
  new Promise((resolve, reject) => {
    const comment = new Comment();
    let savedCommen = comment.WriteACommentToCurrentPost(commentObj);
    console.log("saved comm", savedCommen);
    savedCommen.then(data => {
      Comment.findOne({ _id: data._id })
        .populate("post_id")
        .populate({
          path: "user_who_commented",
          select: "first_name gender last_name user_img_src"
        })
        .exec((err, comments) => {
          //console.log(comments);
          resolve(comments);
        });
    });
  });

const SendEmail = payload =>
  new Promise((resolve, reject) => {
    var mailer = require("nodemailer");
    console.log("request: send mail ", payload);
    let dataPr = payload;

    var smtpTransport = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.REACT_APP_GMAIL_USER_NAME,
        pass: process.env.REACT_APP_GMAIL_PASSWORD
      }
    });
    var mail = {
      from: "Email Nou De La CroitotieLaRodica <lucutovidiuwork@gmail.com>",
      to: dataPr.emailToAddress,
      subject: dataPr.emailSubject,
      text: dataPr.emailMsg,
      html: dataPr.emailMsg
    };

    smtpTransport.sendMail(mail, function(error, response) {
      if (error) {
        reject(error);
        // res.send(JSON.stringify(error));
        console.log(error);
      } else {
        //res.send(JSON.stringify("Message sent: " + response.message));
        let retMsg = { msesage: "Message sent" };
        resolve(JSON.stringify(retMsg));
        // console.log(retMsg);
      }
      smtpTransport.close();
    });
  });

module.exports.handler = serverless(app);
