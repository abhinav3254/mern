import React from 'react'

function SignUp() {
    return (
        <div>
            <form>
                <input type="text" placeholder='name' />
                <input type="password" placeholder='password' />
                <input type="text" placeholder='email' />
                <input type="text" placeholder='phone' />

                <button>submit</button>
            </form>
        </div>
    )
}

export default SignUp