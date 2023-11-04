import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {AddCostSheetPage} from './AddCostSheetPage'

const AddCostSheetPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Troškovnik</PageTitle>
      <AddCostSheetPage />
    </>
  )
}

export default AddCostSheetPageWrapper