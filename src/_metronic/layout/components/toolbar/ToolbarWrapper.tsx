import clsx from 'clsx'
import {ToolbarType, useLayout} from '../../core'
import {Toolbar} from './Toolbar'
import {PageTitleWrapper} from './page-title'

const ToolbarWrapper = () => {
  const {config, classes} = useLayout()
  if (!config.app?.toolbar?.display) {
    return null
  }

  const isPageTitleVisible = showPageTitle(
    config.app?.toolbar?.layout,
    config.app?.pageTitle?.display
  )

  return (
    <></>
  )
}

const showPageTitle = (appToolbarLayout?: ToolbarType, appPageTitleDisplay?: boolean): boolean => {
  const viewsWithPageTitles = ['classic', 'reports', 'saas']
  if (!appToolbarLayout || !appPageTitleDisplay) {
    return false
  }

  return appPageTitleDisplay && viewsWithPageTitles.some((t) => t === appToolbarLayout)
}

export {ToolbarWrapper}
