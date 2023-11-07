import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {EditHourlyRatePage} from './EditHourlyRatePage'

const EditHourlyRatePageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Satnica</PageTitle>
      <EditHourlyRatePage />
    </>
  )
}

export default EditHourlyRatePageWrapper