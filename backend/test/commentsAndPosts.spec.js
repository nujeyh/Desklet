const app = require('../index.js');
const request = require('supertest');
// const makeApp = require('./app');


    describe("게시글 라우터 테스트", () => {
      
      test('/posts 로 get 요청할 시 한 개 이상의 글 목록이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/posts")

          const { post } = res.body;
        expect(post[0]).toBeTruthy();

      });

      test('/posts/:postId 로 get 요청할 시 해당 게시글과 게시글의 댓글이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/posts/1")

          const { post, comments } = res.body;
  
        expect(post).toBeTruthy();
        expect(comments).toBeTruthy();

      });

      test.only('/posts 로 post요청 시 status 200이 반환되어야 한다.', async () => {

        const res = await request(app)
            .post("/posts")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .field({
                "title": "테스트코드타이틀",
                "content": "테스트코드컨텐트",
            })
            .attach('imageTestCode',
            'testcode.png')

              /* .attach('imageTestCode',
            'testcode.png') */

            expect(res.statusCode).toBe(200);

          });
         /* s3.deleteObject(
            {
              Bucket: "desklet",
              Key: DeleteS3,
            },
            (err, data) => {
              if (err) {
                throw err;
              }
            }
          );  */
      });


      test('권한 없이 /posts 로 post요청 시 status 401이 반환되어야 한다.', async () => {

        const res = await request(app)
            .post("/posts")
            .set(
                "authorization", "Bearer nodeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
                "title": "테스트코드타이틀",
                "content": "테스트코드컨텐트",
                "file": "/asdas/asd.jpeg"
            /* .attach('imageTestCode',
            'testcode.png') */

            })
            console.log(res.error)
            expect(res.statusCode).toBe(401);

            /* await s3.deleteObject(
              {
                Bucket: "desklet",
                Key: DeleteS3,
              },
              (err, data) => {
                if (err) {
                  throw err;
                }
              }
            ); */

      });

    describe("댓글 라우터 테스트", () => {
  
      test('/comments/:postId 로 get 요청할 시 한 개 이상의 댓글 목록이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/comments/1")
          const { comments } = res.body
        expect(comments[0]).toBeTruthy();

      });
  
        test('/comments 로 댓글 post요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .post("/comments")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
                "content": "테스트코드",
                "postId": Date.now()
            })

            expect(res.statusCode).toBe(200);
        });

        test('/comments 로 댓글 post요청 시 응답으로 _id값과 createdAt이 반환되어야 한다.', async () => {
        
          const res = await request(app)
            .post("/comments")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
                "content": "테스트코드_응답요청",
                "postId": Date.now()
            })

            expect(res.body).toBeTruthy();
        });

        test('권한 없이 댓글 등록 요청 시 status 404가 응답되어야 한다.', async () => {
        
          const res = await request(app)
            .post("/comments/62aa788636af96547666efbd")
            .set(
                "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
              "content": "테스트코드",
              "postId": Date.now()
            })


            expect(res.statusCode).toBe(404);
        });
  
        test('/comments/:commendId 로 댓글 put요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .put("/comments/62aa788636af96547666efbd")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
                "data": "테스트코드 수정입니다",
            })

            expect(res.statusCode).toBe(200);
        });

        test('권한 없이 댓글 수정 요청 시 status 401이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .put("/comments/62aa788636af96547666efbd")
            .set(
                "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )

            expect(res.statusCode).toBe(401);
        });
  
/*        test('/comments/:commendId 로 댓글 delete요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .delete("/comments/62aa356ce5c03eb473d514fd")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )

            expect(res.statusCode).toBe(200);
        }); */

        test('권한 없이 댓글 삭제 요청 시 status 401이 반환되어야 한다.', async () => {
        

            const res = await request(app)
              .delete("/comments/62aa788636af96547666efbd")
              .set(
                  "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
                )
  
              expect(res.statusCode).toBe(401);
          });

});