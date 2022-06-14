const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth-middleware")
const Post = require("../schemas/post")
const Comment = require("../schemas/comment")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {   
    cb(null, Date.now().file.originalname);
  }
});
//
const upload = multer({storage: storage});

// 게시물 작성
// upload.single('postImage')에서 'image'는 변수명
// auth추가
// router.post("/", upload.single(postImage), async(req, res) => { //posts
//     console.log(req.file)
//     // req.file내에는 fieldname, originalname,
//     //encoding, destination, filename 등의 정보가 저장
//     // 저장 성공시 asw s3 버킷에 저장
//     const postImage = req.file.location;
//     const createdAt = new Date().toLocaleString()
//     // const { user } = res.locals.user
//     // const userId = user["userId"]
//     const userId = "TEST입니다"
//     const { title, content, nickName} = req.body; // userId 추가해야합니다.
//     console.log(postId);
//     await Post.create({ title, content, nickName, postImage, userId, createdAt });

//     res.json({ success: "msg"})

// });

const field = upload.fields([{ name: "title"}, {name: "content"}, {name: "postImage"}]);

// 게시물작성
router.post("/", auth, field, async(req, res) => { //posts
  console.log(req.body);
  console.log(req.files);
  const createdAt = new Date().toLocaleString();
  const { userId, nickName } = res.locals.user;
  const { title, content } = req.body; // postImage 기능 검증 후 추가
  const postExist = await Post.find().sort('-postId').limit(1);
  let postId = 0;
  
 if(postExist.length){
    postId = postExist[0]['postId'] + 1
 }else{
    postId = 1
 }
  // 로그인했을때만 작성가능하게
  await Post.create({ title, content, nickName, userId, createdAt, postId });
  // postImage 기능 검증 후 추가
  res.json({ success: "msg"})
})

//전체 게시물 조회
router.get("/", async(req, res) => { //posts
    // const { title, content, createdAt, nickName, postImage, postId } = req.query; // objectId추가
    // // const postId = await Post.find(postId : _i) 협의후 추가

    // const post = await Post.find({title, content, createdAt, nickName, postImage, postId })

    const post = await Post.find();

    res.send({post: post});
});

//postId=6297c444c14824e8f5a484ff
//상세 페이지 조회
router.get("/:postId", async(req, res) => { //posts/:postId
    const { postId } = req.params;
    const post = await Post.findOne({ postId : postId});
    const comments = await Comment.findOne({ postId : postId});
    
    res.json({ post, comments}) //comments
})

//게시글 삭제
router.delete("/:postId", auth, async(req, res) => { // /posts/:postId
    const { postId } = req.params //req.params; 
    const { user } = res.locals;
    const userId = user["userId"]  //user["userId"];

    const existPost = await Post.find({ postId: postId});
    const existComment = await Comment.findOne({ postId });
    
    if(userId === existPost[0]['userId']) {
         if(existPost&& existComment) { 
            await Post.deleteOne({postId : postId})
            await Comment.deleteMany({postId: postId})
            res.send({ result: "success"})
        } else if(existPost) {
            await Post.deleteOne({postId: postId})
            res.send({ result: "success"})
        }
    } else { 
        res.status(401).send({ result: "fail"})
    }
    
});

//게시글 수정
router.put("/:postId", auth, async(req, res) => { ///posts/:postId
    const { postId } = req.params;
    
    const { user } = res.locals;

    const { title, content, nickName, postImage } = req.body;

    const userId = user["userId"];
    const existPost = await Post.findOne({postId:postId});

    if(userId === existPost.userId) {
        if(existPost) {
        await Post.updateOne({postId: postId}, { $set: {title, content, postImage, nickName}});
        res.send({ result: "success"})
        } else {
            res.status(400).send({ result: "fail"})
        }
    } else {
        res.send({ reselt :  "fail "})
    }
})

module.exports = router;