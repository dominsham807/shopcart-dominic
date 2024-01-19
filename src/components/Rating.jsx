import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ rate }) => {
    return (
        <span className='rating'>
            {rate >= 1 ? (
                <FaStar />
            ) : rate >= 0.5 ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )}

            {rate >= 2 ? (
                <FaStar />
            ) : rate >= 1.5 ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )}

            {rate >= 3 ? (
                <FaStar />
            ) : rate >= 2.5 ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )}

            {rate >= 4 ? (
                <FaStar />
            ) : rate >= 3.5 ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )}

            {rate >= 5 ? (
                <FaStar />
            ) : rate >= 4.5 ? (
                <FaStarHalfAlt />
            ) : (
                <FaRegStar />
            )} 
        </span>
    )
}

export default Rating