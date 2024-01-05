import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ConstructionOverviewPage} from './ConstructionOverviewPage'

const ConstructionOverviewPageWrapper: FC = ({}) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Construction-sites List</PageTitle>
      <ConstructionOverviewPage />
    </>
  )
}

export default ConstructionOverviewPageWrapper
