import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {HourlyRateOverviewPage} from './HourlyRateOverviewPage'

const HourlyRateOverviewPageWrapper: FC = ({}) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>HourlyRateOverviewPageW</PageTitle>
      <HourlyRateOverviewPage />
    </>
  )
}

export default HourlyRateOverviewPageWrapper
