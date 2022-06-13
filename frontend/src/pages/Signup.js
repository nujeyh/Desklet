import React from 'react'

function Account() {
    return (
        <div>
            <form>
                <input type="email" />
                <input type="text" />
                <input type="password" />
                <input type="password" />
                <button>회원가입</button>
                <p>계정이 있으신가요?</p>
                <button>로그인</button>
            </form>
        </div>
    )
}

export default Account