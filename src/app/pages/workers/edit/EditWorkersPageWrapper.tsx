import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {EditWorkersPage} from './EditWorkersPage'

const EditWorkersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Add Workers</PageTitle>
      <EditWorkersPage />
    </>
  )
}

export default EditWorkersPageWrapper
