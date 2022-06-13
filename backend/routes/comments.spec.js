const { post } = require('./comments');

describe('댓글 작성 테스트', () => {

    const authMiddleware = jest.fn();
    const userId = 'user123';
    const nickname = 'nickname123';

    const req = {
        body: {
        content: "Let's test this comment!",
        commentId: 'today0613',
        postId: 'christmas1225',
        createdAt: '2022-12-25'
        },
    };

    test('Comments 스키마에 알맞는 객체를 DB에 저장할 수 있다.', () => {
        expect(() => {
            console.log(post());
        }).not.toThrow();
    });
});
