import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {AddConstructionsPage} from './AddConstructionsPage'

const AddConstructionsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Add Construction-sites</PageTitle>
      <AddConstructionsPage />
    </>
  )
}

export default AddConstructionsPageWrapper
