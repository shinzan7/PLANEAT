import React from 'react'
import CardNutrient from 'components/common/CardNutrient'
import { PostAdd } from '@mui/icons-material'

const Info = ({info}) => {
  return (
    <div>
      {info.map(data => 
          <CardNutrient pill={data} />
        )}
    </div>
  )
}

export default Info;