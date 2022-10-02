import React from 'react';
import {Link} from 'react-router-dom';

const Pagination = ({postPerPage, totalPosts, paginate, ingredient}) => {
  const pageNumbers = []

  console.log('재료',ingredient.id)

  for (let i=1; i<=Math.ceil(totalPosts/postPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul className='pagination'>
      {pageNumbers.map(num =>
        <li key={num}>
          <a onClick={() => paginate(num)} href=''>{num}</a>
          {/* <Link to={'/nutrientresult/'+ingredient.id} onClick={() => paginate(num)} >{num}</Link> */}
        </li>
        )}
    </ul>
  )
}

export default Pagination;