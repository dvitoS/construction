import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate, useParams} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import AddConstructionsPageWrapper from '../pages/construction-sites/add/AddConstructionsPageWrapper'
import HourlyRatePageWrapper from '../pages/hourly_rate/add/AddHourlyRatePageWrapper'
import CostSheetPageWrapper from '../pages/cost_sheet/add/AddCostSheetPageWrapper'
import AddHourlyRatePageWrapper from '../pages/hourly_rate/add/AddHourlyRatePageWrapper'
import EditHourlyRatePageWrapper from '../pages/hourly_rate/edit/EditHourlyRatePageWrapper'
import ListHourlyRatePageWrapper from '../pages/hourly_rate/list/ListHourlyRatePageWrapper'
import AddCostSheetPageWrapper  from '../pages/cost_sheet/add/AddCostSheetPageWrapper'
import EditCostSheetPageWrapper from '../pages/cost_sheet/edit/EditCostSheetPageWrapper'
import ListCostSheetPageWrapper from '../pages/cost_sheet/list/ListCostSheetPageWrapper'
import SingleWorkerPageWrapper from '../pages/workers/singleworkerpage/SingleWorkerPageWrapper'
import TotalCostSheetPageWrapper from '../pages/cost_sheet/total/TotalCostSheetPageWrapper'
import WorkerSettingsPageWrapper  from '../pages/workers/WorkerSettingsPage/WorkerSettingsPageWrapper'
import WorkerOverviewPageWrapper from '../pages/workers/WorkerOverviewPage/WorkerOverviewPageWrapper'
import ConstructionOverviewPageWrapper from '../pages/construction-sites/ConstructionOverviewPage/ConstructionOverviewPageWrapper'
import EditWorkersPageWrapper from '../pages/workers/edit/EditWorkersPageWrapper'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const WorkerOverviewPageWrapper = lazy(() => import('../pages/workers/WorkerOverviewPage/WorkerOverviewPageWrapper'))
  const WorkerSettingsPageWrapper = lazy(() => import ('../pages/workers/WorkerSettingsPage/WorkerSettingsPageWrapper'))
  const AddWorkersPageWrapper = lazy(() => import ('../pages/workers/add/AddWorkersPageWrapper'))
  const EditWorkersPageWrapper = lazy(() => import ('../pages/workers/edit/EditWorkersPageWrapper'))
  const ListWorkersPageWrapper = lazy(() => import ('../pages/workers/list/ListWorkerPageWrapper'))
  const AddConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/add/AddConstructionsPageWrapper'))
  const EditConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/edit/EditConstructionsPageWrapper'))
  const ListConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/list/ListConstructionsPageWrapper'))
  const ConstructionOverviewPageWrapper = lazy(() => import ('../pages/construction-sites/ConstructionOverviewPage/ConstructionOverviewPageWrapper'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='add' element={<AddWorkersPageWrapper />} />
        <Route path='/worker/edit/:id' element={<EditWorkersPageWrapper />} />
        <Route path='list' element={<ListWorkersPageWrapper />} />
        <Route path='singleworker/:id' element={<SingleWorkerPageWrapper/>} />
        <Route path='add' element={<AddConstructionsPageWrapper />} />
        <Route path='editc/:id' element={<EditConstructionsPageWrapper />} />
        <Route path='list' element={<ListConstructionsPageWrapper />} />
        <Route path='construction/:id' element={<ConstructionOverviewPageWrapper/>} />        
        <Route path='hr' element={<HourlyRatePageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='add' element={<AddHourlyRatePageWrapper />} />
        <Route path='edit/:id' element={<EditHourlyRatePageWrapper />} />
        <Route path='list' element={<ListHourlyRatePageWrapper />} />
        <Route path='add' element={<AddCostSheetPageWrapper />} />
        <Route path='edit/:id' element={<EditCostSheetPageWrapper />} />
        <Route path='list' element={<ListCostSheetPageWrapper />} />
        <Route path='total' element={<TotalCostSheetPageWrapper />} />
        <Route path='worker/settings/:id' element={<WorkerSettingsPageWrapper />} />
        <Route path='worker/:id' element={<WorkerOverviewPageWrapper />} />
       
        
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='workers/add'
          element={
            <SuspensedView>
              <AddWorkersPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='worker/edit'
          element={
            <SuspensedView>
              <EditWorkersPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='workers/list'
          element={
            <SuspensedView>
              <ListWorkersPageWrapper />
            </SuspensedView>
          }
        />
 
         <Route
          path='worker/settings'
          element={
            <SuspensedView>
              <WorkerSettingsPageWrapper />
            </SuspensedView>
          }
        />
         <Route
          path='worker'
          element={
            <SuspensedView>
              <WorkerOverviewPageWrapper />
            </SuspensedView>
          }
        />

        <Route
          path='constructions/add'
          element={
            <SuspensedView>
              <AddConstructionsPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='constructions/edit'
          element={
            <SuspensedView>
              <EditConstructionsPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='constructions/list'
          element={
            <SuspensedView>
              <ListConstructionsPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='construction'
          element={
            <SuspensedView>
              <ConstructionOverviewPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/hourlyrate/add'
          element={
            <SuspensedView>
              <AddHourlyRatePageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/hourlyrate/edit'
          element={
            <SuspensedView>
              <EditHourlyRatePageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/hourlyrate/list'
          element={
            <SuspensedView>
              <ListHourlyRatePageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/costsheet/add'
          element={
            <SuspensedView>
              <AddCostSheetPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/costsheet/edit'
          element={
            <SuspensedView>
              <EditCostSheetPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/costsheet/list'
          element={
            <SuspensedView>
              <ListCostSheetPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/costsheet/total'
          element={
            <SuspensedView>
              <TotalCostSheetPageWrapper />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
