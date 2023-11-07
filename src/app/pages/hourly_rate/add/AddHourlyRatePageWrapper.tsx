import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {AddHourlyRatePage} from './AddHourlyRatePage'

const AddHourlyRatePageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Satnica</PageTitle>
      <AddHourlyRatePage />
    </>
  )
}

export default AddHourlyRatePageWrapper