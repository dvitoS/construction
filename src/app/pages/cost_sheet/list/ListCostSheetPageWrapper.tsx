import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ListCostSheetPage} from './ListCostSheetPage'

const ListCostSheetPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Troškovnik</PageTitle>
      <ListCostSheetPage />
    </>
  )
}

export default ListCostSheetPageWrapper