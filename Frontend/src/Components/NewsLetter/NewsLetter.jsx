import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsLetter'>
    <h1>Get Exclusive offers On 
        your Email
    </h1>
    <p>Subscribe to our newsletter and stay updated</p>
    <div>
        <input type='email' placeholder='Your Email Id'></input>
        <button>Subscribe</button>
    </div>
    </div>
  )
}

export default NewsLetter