/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import KTSVG from '../../../../assets/keenicons/duotone/fonts/keenicons-duotone.svg'


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
            to='/crafted/workers/list'
            title='Lista radnika'
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
            to='/crafted/constructions/list'
            title='Lista gradilišta'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>  

      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Financije'
        fontIcon='bi-archive'
        icon='element-plus'
      >
       
      <SidebarMenuItemWithSub to='/crafted/pages' title='Satnica' hasBullet={true}>
        <SidebarMenuItem
          to='/crafted/hourlyrate/add'
          title='Dodaj satnicu'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/crafted/hourlyrate/list'
          title='Lista satnica'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to='/crafted/pages' title='Troškovnik' hasBullet={true}>
        <SidebarMenuItem
          to='/crafted/costsheet/add'
          title='Dodaj troškovnik'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/crafted/costsheet/list'
          title='Lista troškovnika'
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
