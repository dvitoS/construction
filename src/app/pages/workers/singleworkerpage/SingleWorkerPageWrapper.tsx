import React, {FC} from 'react'
import {PageTitle} from '../../../../_metronic/layout/core'
import {SingleWorkerPage} from './SingleWorkerPage'



const SingleWorkerPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>List Workers</PageTitle>
      <SingleWorkerPage className={''}/>
    </>
  )
}

export default SingleWorkerPageWrapper
