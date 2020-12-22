import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title: 'Treatment',
        path: '/treatment',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Quarantine',
        path: '/quarantine',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Rules and Guidelines',
        path: '/rules',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    }
   
]