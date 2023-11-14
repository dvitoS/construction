import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {TotalCostSheetPage} from './TotalCostSheetPage'

const TotalCostSheetPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Troškovnik</PageTitle>
      <TotalCostSheetPage />
    </>
  )
}

export default TotalCostSheetPageWrapper