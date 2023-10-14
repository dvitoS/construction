import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {WorkersPage} from './WorkersPage'

const WorkersPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <WorkersPage />
    </>
  )
}

export default WorkersPageWrapper
