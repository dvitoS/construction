import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ListConstructionsPage} from './ListConstructionsPage'

const ListConstructionsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Construction-sites</PageTitle>
      <ListConstructionsPage />
    </>
  )
}

export default ListConstructionsPageWrapper
