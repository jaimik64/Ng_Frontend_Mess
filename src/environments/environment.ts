export const environment = {
    production: false,

    baseUrl: 'https://better-fawn-cloak.cyclic.app',

    // auth
    login: '/auth/signin',
    signup: '/auth/signup',
    logout: '/auth/signout',

    // mess
    messLogin: '/mesh/auth/signin',
    messSignup: '/mesh/auth/signup',
    messLogout: '/mesh/auth/signout',

    getDishesByMessId: '/mesh/dishes',
    getOrdersByMessID: '/mesh/orders',
    getSubscriptionsByMessId: '/mesh/subscription',
    getMessUserDetail: '/mesh/user_details',
    addDishByMess: '/mesh/addDish',
    deleteDishByMess: '/mesh/removeDish',
    updateDishByMess: '/mesh/updateDish',
    updateOrderStatus: '/mesh/updateOrder',
    updateMessProfile: '/mesh/update',


    // admin
    adminGetDishes: '/admin/allDishes',
    adminGetOrders: '/order/allOrders',
    adminGetAddresses: '/admin/allAddresses',
    adminGetUsers: '/admin/getAllUsers',
    adminGetMess: '/admin/mesh',
    adminGetSubscriptions: '/admin/subscription',
    adminUpdateRole: '/admin/updateRole',
    adminRemoveUser: '/admin/removeUser',
    adminRemoveMess: '/admin/removeMesh',
    adminSettleOrders: '/admin/settleOrders',
    adminSettleSubscriptions: '/admin/settleSubscriptions',

    // user
    UserGetMessDetails: '/users/meshes',
    UserGetDishesByMessId: '/users/mesh/dishes'
};
