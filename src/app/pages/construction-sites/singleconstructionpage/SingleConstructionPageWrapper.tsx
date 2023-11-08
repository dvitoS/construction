import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {SingleConstructionPage} from './SingleConstructionPage'

const SingleConstructionPageWrapper: FC = ({}) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Construction-sites List</PageTitle>
      <SingleConstructionPage />
    </>
  )
}

export default SingleConstructionPageWrapper
