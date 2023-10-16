import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {EditConstructionsPage} from './EditConstructionsPage'

const EditConstructionsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Construction-sites</PageTitle>
      <EditConstructionsPage />
    </>
  )
}

export default EditConstructionsPageWrapper
