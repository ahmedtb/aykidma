import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Routes } from '../utility/Urls'
import { BsListOl } from 'react-icons/bs'
import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"
import AllowedLink from './AllowedLink'
import ToggleList from './ToggleList'

function SideMenue(props) {

    const [hide, sethide] = React.useState(false);
    React.useEffect(() => {
        console.log('AllowedRoutes', props.allowedRoutes)
        // console.log('AllowedRoutes', props.user)

    }, [props.allowedRoutes])

    // if (hide)
    //     return <Col xs={1} className='bg-dark text-white p-1 ' >
    //         <Button onClick={() => sethide(!hide)}><BsListOl /></Button>
    //         <div className='text-center'> لوحة تحكم {props.user?.userable?.type} </div>
    //     </Col>
    // else
    return <Col xs={2} className='bg-dark text-white p-1 ' >
        {/* <Button onClick={() => sethide(!hide)}><BsListOl /></Button> */}

        <div className='p-1'>


            <AllowedLink displayChildrenOnly={true} className="d-flex align-items-center text-white text-decoration-none" to={Routes.CategoriesScreen()}>
                {/* <BsListOl /> */}
                <div className='mx-1'>
                    التصنيفات
                </div>
            </AllowedLink>

            <AllowedLink displayChildrenOnly={true} className="d-flex align-items-center text-white text-decoration-none" to={Routes.reportsIndex()}>
                {/* <BsListOl /> */}
                <div className='mx-1'>
                    التقارير
                </div>
            </AllowedLink>

            <ToggleList
                allowedRoutes={props.allowedRoutes}
                label={<div className='d-flex'>
                    {/* <BsListOl size={25} /> */}
                    <div className=' mx-2'>المطالبات</div>
                </div>}
                links={[
                    { label: 'قائمة مزويدي الخدمات', to: Routes.serviceProvidersIndex() },
                    { label: 'قائمة الاشعارات', to: Routes.providerNotificationsIndex() },
                    { label: 'طلبات تسجيل كمزوّد', to: Routes.providerEnrollmentRequestsIndex() }
                ]}
            />
            <ToggleList
                allowedRoutes={props.allowedRoutes}
                label={'المستخدمين'}
                links={[
                    { label: 'قائمة المستخدمين', to: Routes.usersIndex() },
                    { label: 'الاشعارات', to: Routes.userNotificationsIndex() },
                ]}
            />

            <ToggleList
                allowedRoutes={props.allowedRoutes}
                label={'الخدمات'}
                links={[
                    { label: 'خدمات مفعلة', to: Routes.approvedServicesIndex() },
                    { label: 'خدمات مقترحه', to: Routes.notApprovedServicesIndex() },
                ]}
            />
            <ToggleList
                allowedRoutes={props.allowedRoutes}
                label={'الطلبات'}
                links={[
                    { label: 'طلبات جديد', to: Routes.newOrders() },
                    { label: 'طلبات مستانفة', to: Routes.resumedOrders() },
                    { label: 'طلبات مكتملة', to: Routes.doneOrders() },
                    { label: 'التعليقات', to: Routes.reviewsIndex() },

                ]}
            />

        </div>


    </Col >


}


const mapStateToProps = state => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideMenue)