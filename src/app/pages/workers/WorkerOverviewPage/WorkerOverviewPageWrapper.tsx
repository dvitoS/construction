import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {WorkerOverviewPage} from './WorkerOverviewPage'


type Props = {
  className: string
}


const WorkerOverviewPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Workers</PageTitle>
      <WorkerOverviewPage />
    </>
  )
}

export default WorkerOverviewPageWrapper
