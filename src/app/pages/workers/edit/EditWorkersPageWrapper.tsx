import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {EditWorkersPage} from './EditWorkersPage'

const EditWorkersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Edit Workers</PageTitle>
      <EditWorkersPage />
    </>
  )
}

export default EditWorkersPageWrapper
