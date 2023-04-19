
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
                    name: 'Profile',
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
                    action: '/mess/profile',
                    name: 'Profile'
                },
                {
                    action: '/mess/manage-dishes',
                    name: 'Manage Dishes'
                },
                {
                    action: '/mess/manage-orders',
                    name: "Manage Orders"
                },
                {
                    action: '/mess/manage-subscriptions',
                    name: 'Manage Subscriptions'
                }
            ],
            id: 'Mess'
        },
        {
            menuList: [
                {
                    action: '/admin/dashboard',
                    name: 'Admin Dashboard'
                },
                {
                    action: '/admin/users',
                    name: 'Manage Users'
                },
                {
                    action: '/admin/orders',
                    name: 'Manage Orders'
                },
                {
                    action: '/admin/dishes',
                    name: 'Manage Dishes'
                },
                {
                    action: '/admin/subscriptions',
                    name: 'Manage Subscriptions'
                },
                {
                    action: '/admin/mess',
                    name: 'Manage Mess'
                }
            ],
            id: 'Admin'
        }

    ]
}