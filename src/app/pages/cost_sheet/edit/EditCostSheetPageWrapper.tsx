import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {EditCostSheetPage} from './EditCostSheetPage'

const EditCostSheetPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Troškovnik</PageTitle>
      <EditCostSheetPage />
    </>
  )
}

export default EditCostSheetPageWrapper