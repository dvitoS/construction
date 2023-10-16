import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import WorkersPageWrapper from '../pages/workers/WorkersPageWrapper'
import AddConstructionsPageWrapper from '../pages/construction-sites/add/AddConstructionsPageWrapper'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const AddWorkersPageWrapper = lazy(() => import ('../pages/workers/add/AddWorkersPageWrapper'))
  const EditWorkersPageWrapper = lazy(() => import ('../pages/workers/edit/EditWorkersPageWrapper'))
  const ListWorkersPageWrapper = lazy(() => import ('../pages/workers/list/ListWorkersPageWrapper'))
  const AddConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/add/AddConstructionsPageWrapper'))
  const EditConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/edit/EditConstructionsPageWrapper'))
  const ListConstructionsPageWrapper = lazy(() => import ('../pages/construction-sites/list/ListConstructionsPageWrapper'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='addworkers' element={<AddWorkersPageWrapper />} />
        <Route path='editworkers' element={<EditWorkersPageWrapper />} />
        <Route path='listworkers' element={<ListWorkersPageWrapper />} />
        <Route path='addconstructions' element={<AddConstructionsPageWrapper />} />
        <Route path='editconstructions' element={<EditConstructionsPageWrapper />} />
        <Route path='listconstructions' element={<ListConstructionsPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        
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
          path='crafted/pages/addworkers'
          element={
            <SuspensedView>
              <AddWorkersPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/editworkers'
          element={
            <SuspensedView>
              <EditWorkersPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/listworkers'
          element={
            <SuspensedView>
              <ListWorkersPageWrapper />
            </SuspensedView>
          }
        />

        <Route
          path='crafted/pages/addconstructions'
          element={
            <SuspensedView>
              <AddConstructionsPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/editconstructions'
          element={
            <SuspensedView>
              <EditConstructionsPageWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/listconstructions'
          element={
            <SuspensedView>
              <ListConstructionsPageWrapper />
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
