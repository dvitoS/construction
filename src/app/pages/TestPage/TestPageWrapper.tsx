import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {TestPage} from './TestPage'

const TestPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Add Workers</PageTitle>
      <TestPage />
    </>
  )
}

export default TestPageWrapper
