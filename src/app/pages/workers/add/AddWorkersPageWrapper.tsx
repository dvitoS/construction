import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {AddWorkersPage} from './AddWorkersPage'

const AddWorkersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Add Workers</PageTitle>
      <AddWorkersPage />
    </>
  )
}

export default AddWorkersPageWrapper
