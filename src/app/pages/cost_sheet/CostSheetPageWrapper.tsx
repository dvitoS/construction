import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {CostSheetPage} from './CostSheetPage'

const CostSheetPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Troškovnik</PageTitle>
      <CostSheetPage />
    </>
  )
}

export default CostSheetPageWrapper