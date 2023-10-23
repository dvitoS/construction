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
      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Radinci i gradilišta'
        fontIcon='bi-archive'
        icon='element-plus'
      >

        <SidebarMenuItemWithSub to='/crafted/pages' title='Radinici' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/addworkers'
            title='Dodaj radnika'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/editworkers'
            title='Izmjeni radnika'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/listworkers'
            title='Popis radnika'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>


        <SidebarMenuItemWithSub to='/crafted/pages' title='Gradilišta' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/addconstructions'
            title='Dodaj gradilišta'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/editconstructions'
            title='Izmjeni gradilišta'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/listconstructions'
            title='Popis gradilišta'
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
      
      
    </>
  )
}

export {SidebarMenuMain}
