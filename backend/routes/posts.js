const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware")
const Post = require("../schema/post")
const Comment = require("../schema/comment")

// router.get("/api", (req, res) => {
//     res.send("hello world")
// })

// 게시물 작성
router.post("/", auth, async(req, res) => { //posts
    const { user } = res.locals.user // userId vertual ID???
    const userId = user["userId"]
    // const userId = "test8"
    const { title, content, createdAt, postImage, nickName} = req.body; // userId 추가해야합니다.
    console.log(postId);
    await Post.create({ title, content, createdAt, nickName, postImage, userId });

    res.json({ success: "msg"})

});

//전체 게시물 조회
router.get("/", async(req, res) => { //posts
    const { title, content, createdAt, nickName, postImage } = req.query; // objectId추가
    // const postId = await Post.find(_id : _i) 협의후 추가

    const post = await Post.find({title, content, createdAt, nickName, postImage, postId})
    console.log(post);

    res.send({post: post});
});

//postId=6297c444c14824e8f5a484ff
//상세 페이지 조회
router.get("/:postId", async(req, res) => { //posts/:postId
    const { postId } = req.params;
    const post = await Post.findOne({ _id : postId});
    const comments = await Comment.findOne({ postId : postId});
    
    res.json({ post, comments}) //comments
})

//게시글 삭제
router.delete("/:postId", auth, async(req, res) => { // /posts/:postId
    const { postId } = req.params //req.params; 
    const { user } = res.locals;
    const userId = user["userId"]  //user["userId"];

    const existPost = await Post.find({ _id: postId});
    const existComment = await Comment.findOne({ postId });


    
    if(userId === existPost[0]['userId']) {
         if(existPost&& existComment) { 
            await Post.deleteOne({_id : postId})
            await Comment.deleteMany({_id: postId})
            res.send({ result: "success"})
        } else if(existPost) {
            await Post.deleteOne({_id: postId})
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

    console.log("User :", user);
    const { title, content, nickName, postImage } = req.body;

    const userId = user["userId"];
    const existPost = await Post.findOne({_id:postId});

    if(userId === existPost.userId) {
        if(existPost) {
        await Post.updateOne({_id: postId}, { $set: {title, content, postImage, nickName}});
        res.send({ result: "success"})
        } else {
            res.status(400).send({ result: "fail"})
        }
    } else {
        res.send({ reselt :  "fail "})
    }

})

module.exports = router;
