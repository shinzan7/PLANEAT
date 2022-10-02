import React from 'react'
import CardNutrient from 'components/common/CardNutrient'

const Info = ({info}) => {
  return (
    <ul>
      {info.map(data => 
          <CardNutrient pill={data} />
        )}
    </ul>
  )
}

export default Info;