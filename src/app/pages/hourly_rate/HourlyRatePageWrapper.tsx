import React, {FC} from 'react'
import {PageTitle} from '../../../../src/_metronic/layout/core'
import {HourlyRatePage} from './HourlyRatePage'

const HourlyRatePageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Satnica</PageTitle>
      <HourlyRatePage />
    </>
  )
}

export default HourlyRatePageWrapper