import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ListHourlyRatePage} from './ListHourlyRatePage'

const ListHourlyRatePageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Satnica</PageTitle>
      <ListHourlyRatePage />
    </>
  )
}

export default ListHourlyRatePageWrapper