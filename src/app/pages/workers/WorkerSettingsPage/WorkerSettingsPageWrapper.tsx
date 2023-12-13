import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {WorkerSettingsPage} from './WorkerSettingsPage'




const WorkerSettingsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Settings</PageTitle>
      <WorkerSettingsPage />
    </>
  )
}

export default WorkerSettingsPageWrapper
