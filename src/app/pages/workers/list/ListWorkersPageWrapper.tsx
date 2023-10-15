import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ListWorkersPage} from './ListWorkersPage'

const ListWorkersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Add Workers</PageTitle>
      <ListWorkersPage />
    </>
  )
}

export default ListWorkersPageWrapper
