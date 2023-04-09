export const environment = {
    production: false,

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
    updateOrderStatus: '/mesh/updateOrder'
};
