const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth-middleware")
const Post = require("../schema/post")
const Comment = require("../schema/comment")
// const upload = require("../middleware/upload");
// router.get("/api", (req, res) => {
//     res.send("hello world")
// })

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

router.post("/", auth, async(req, res) => { //posts
    
    const createdAt = new Date().toLocaleString()
    const { user } = res.locals.user
    const userId = user["userId"]
    // const userId = "TEST입니다123123"
    const { title, content, nickName } = req.body; // postImage 기능 검증 후 추가
    const postExist = await Post.find()
    let postId = 0;
    
	if(postExist.length){
		postId = postExist[0]['postId'] + 1
	}else{
		postId = 1
	}

    await Post.create({ title, content, nickName, userId, createdAt, postId });
    // postImage 기능 검증 후 추가
    res.json({ success: "msg"})
})

//전체 게시물 조회
router.get("/", async(req, res) => { //posts
    const { title, content, createdAt, nickName, postImage } = req.query; // objectId추가
    // const postId = await Post.find(_id : _i) 협의후 추가

    const post = await Post.find({title, content, createdAt, nickName, postImage })
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
router.delete("/:postId", async(req, res) => { // /posts/:postId
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
router.put("/:postId",  async(req, res) => { ///posts/:postId
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
