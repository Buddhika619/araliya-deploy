import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' constent={description} />
        <meta name='keyword' constent={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Araliya Foods',
    description: 'The best food ever',
    keywords: 'foods, buy foods, quality foods'
}

export default Meta