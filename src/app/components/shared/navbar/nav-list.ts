
export interface navContent {
    menu: userWiseDetails[]
}

export interface userWiseDetails {
    menuList: menuDetail[];
    id: string;
}
export interface menuDetail {
    action: string;
    name: string;
}

export const navList: navContent = {
    menu: [
        {
            menuList: [
                {
                    action: '/user/profile',
                    name: 'Profile'
                },
                {
                    action: '/user/home',
                    name: 'Dashboard'
                },
                {
                    action: '/user/subscriptions',
                    name: 'Subscriptions'
                },
                {
                    action: 'user/orders',
                    name: 'Orders'
                },

            ],
            id: 'User'
        },
        {
            menuList: [
                {
                    action: '/',
                    name: 'Profile'
                }
            ],
            id: 'Mess'
        },
        {
            menuList: [
                {
                    action: '/dashboard',
                    name: 'Admin Dashboard'
                }
            ],
            id: 'Admin'
        }

    ]
}