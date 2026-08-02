import { useState, useEffect } from 'react'
import { translateDate } from '../Helpers'
import './Comment.css'

const Comment = ({content, date}) => {
    return (
        <div className="comment">
            <p>{translateDate(date)}</p>
            <p>{content}</p>
        </div>
    )
}

export default Comment