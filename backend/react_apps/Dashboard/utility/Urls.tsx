import { logError } from './helpers'
import axios from "axios"

export const Routes = {
    dashboard: () => '/dashboard',

    LoginPageScreen: () => '/dashboard/LoginPageScreen',
    CategoriesScreen: () => '/dashboard/CategoriesScreen',

    serviceProvidersIndex: () => '/dashboard/providers',
    providerEnrollmentRequestsIndex: () => '/dashboard/providerEnrollmentRequests',

    notApprovedServicesIndex: () => '/dashboard/notApprovedServices',
    approvedServicesIndex: () => '/dashboard/approvedServicesIndex',

    newOrders: () => '/dashboard/neworders/',
    resumedOrders: () => '/dashboard/resumedorders/',
    doneOrders: () => '/dashboard/doneorders/',
    reviewsIndex: () => '/dashboard/reviews',
    showOrder: (id?: number) => id ? '/dashboard/orders/' + id : '/dashboard/orders/:id',

    showService: (id?: number) => id ? '/dashboard/services/' + id : '/dashboard/services/:id',
    showProvider: (id?: number) => id ? '/dashboard/providers/' + id : '/dashboard/providers/:id',

    usersIndex: () => '/dashboard/users',
    showUser: (id?: number) => id ? '/dashboard/users/' + id : '/dashboard/users/:id',

    reportsIndex: () => '/dashboard/reports',
    showReport: (id?: number) => id ? '/dashboard/reports/' + id : '/dashboard/reports/:id',

    userNotificationsIndex: () => '/dashboard/userNotifications',
    providerNotificationsIndex: () => '/dashboard/providerNotifications',

}


export const Api = {
    login: (phone_number, password) => axios.post('/dashboardAPI/loginAdmin', { phone_number: phone_number, password: password }),
    fetchAdmin: () => axios.get('/dashboardAPI/fetchAdmin'),
    logoutAdmin: '/dashboardAPI/logoutAdmin',
    home: () => axios.get('/dashboardAPI/home'),

    approveService: (id?: number) => axios.put('/dashboardAPI/approve/service', { service_id: id }),
    rejectService: (id?: number) => axios.delete('/dashboardAPI/reject/service', { params: { service_id: id } }),
    approveProviderEnrollment: (id?: number) => id ? axios.get(`/dashboardAPI/approve/providerEnrollment/${id}`) : axios.get('/dashboardAPI/approve/providerEnrollment/:id'),
    rejectProviderEnrollment: (id?: number) => id ? axios.delete(`/dashboardAPI/reject/providerEnrollment/${id}`) : axios.delete('/dashboardAPI/reject/providerEnrollment/:id'),

    activateProvider: '/dashboardAPI/activateProvider/:id',
    deleteReview: '/dashboardAPI/order/deleteReview',

    fetchCategories: (params?) => { return axios.get('/dashboardAPI/category', { params: params }) },
    destroyCategory: (id?: number) => { return axios.delete('/dashboardAPI/category/' + id) },
    createCategory: (params) => { return axios.post('/dashboardAPI/category', params) },
    editcategory: (id, params?) => {
        return axios.put('/dashboardAPI/category/' + id, params)
    },
    fetchProviders: (activated = null, withs = []) => axios.get('/dashboardAPI/providers/', {
        params: {
            activated: activated ? activated : undefined,
            with: withs,
        }
    }),
    fetchProvider: (id?: number) => axios.get('/dashboardAPI/providers/' + id),
    fetchProviderEnrollmentRequests: () => axios.get('/dashboardAPI/providerEnrollmentRequests'),

    fetchOrders: (status = null, withs = []) => axios.get('/dashboardAPI/orders/', {
        params: {
            status: status ? status : undefined,
            with: withs,
        }
    }),

    fetchServices: (approved = null, withs = []) => axios.get('/dashboardAPI/services/', {
        params: {
            approved: approved ? approved : undefined,
            with: withs,
        }
    }),
    fetchService: (id, withs = []) => axios.get('/dashboardAPI/services/' + id, { params: { with: withs, } }),

    fetchUsers: (withs = []) => axios.get('/dashboardAPI/users', { params: { with: withs } }),
    fetchUser: (id, withs = []) => axios.get('/dashboardAPI/users/' + id, { params: { with: withs } }),

    fetchReports: (withs = []) => axios.get('/dashboardAPI/reports', { params: { with: withs } }),
    fetchReport: (id, withs = []) => axios.get('/dashboardAPI/reports/' + id, { params: { with: withs } }),

    fetchUserNotifications: (withs = []) => axios.get('/dashboardAPI/userNotifications', { params: { with: withs } }),

    fetchProviderNotifications: (withs = []) => axios.get('/dashboardAPI/providerNotifications', { params: { with: withs } }),

    fetchReviews: (withs = []) => axios.get('/dashboardAPI/reviews', { params: { with: withs } }),
}
