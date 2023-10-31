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
            to='/crafted/workers/add'
            title='Dodaj radnika'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/workers/edit'
            title='Izmjeni radnika'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/workers/list'
            title='Popis radnika'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>


        <SidebarMenuItemWithSub to='/crafted/pages' title='Gradilišta' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/constructions/add'
            title='Dodaj gradilišta'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/constructions/edit'
            title='Izmjeni gradilišta'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/constructions/list'
            title='Popis gradilišta'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>


        <SidebarMenuItem
          to='/crafted/hourlyrate'
          title='Satnica'
          hasBullet={true}
        />  

        <SidebarMenuItem
          to='/crafted/costsheet'
          title='Troškovnik'
          hasBullet={true}
        />  


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
