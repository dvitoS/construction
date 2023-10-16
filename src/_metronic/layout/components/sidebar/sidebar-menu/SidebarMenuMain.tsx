/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='element-plus'
      >

        <SidebarMenuItemWithSub to='/crafted/pages' title='Workers' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/addworkers'
            title='Add Workers'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/editworkers'
            title='Edit Workers'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/listworkers'
            title='List Workers'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>


        <SidebarMenuItemWithSub to='/crafted/pages' title='Constructions' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/addconstructions'
            title='Add Constructions'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/editconstructions'
            title='Edit Constructions'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/listconstructions'
            title='List Constructions'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        


      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      
      
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      
      
    </>
  )
}

export {SidebarMenuMain}
