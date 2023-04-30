export const environment = {
    production: true,

    baseUrl: 'https://better-fawn-cloak.cyclic.app',

    // auth
    login: '/auth/signin',
    signup: '/auth/signup',
    logout: '/auth/signout',

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
    UserGetDishesByMessId: '/users/mesh/dishes',
    UserGetAddresses: '/users/addresses',
    UserAddAddress: '/users/addAddress',
    UserUpdateAddress: '/users/updateAddress',
    UserRemoveAddress: '/users/removeAddress',
    UserGetAllOrders: '/order/orderDetails',
    UserGetSubscriptions: '/users/subscription',
    UserGetSubscriptionByMess: '/users/subscriptions',
    UserBuySubcription: '/users/buy/subscription',
    UserBuyOrder: '/order/createOrder'
};
