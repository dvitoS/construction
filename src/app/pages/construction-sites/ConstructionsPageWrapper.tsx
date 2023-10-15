import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {ConstructionsPage} from './ConstructionsPage'

const ConstructionsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Construction-sites</PageTitle>
      <ConstructionsPage />
    </>
  )
}

export default ConstructionsPageWrapper
