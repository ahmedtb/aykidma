export { };
declare global {
    type routeType = {
        component: React.ReactNode | ConnectedComponent
        path: string,
        permissions: Array<string>
    }
    type allowedRoutesType = Array<routeType>
    
    type routeConfigType = {
        component: React.ReactNode | ConnectedComponent
        path: string,
        title: string,
        permission: Array<string>,
        exact: boolean,
    }
    type routeConfigsType = Array<routeConfigType>

    type notification = {
        read_at: string,
        data: any,
        notifiable_id: number,
        notifiable_type: string,
        type: string,
        id: number,
        created_at: string,
        updated_at: string,
    }
    type notifications = Array<notification>

    type pagination<T> = {
        data: T,
        first_page_url: string,

    }
    type addColumns = Array<{
        title: string,
        content: (item, index: number) => React.ReactNode
    }>
    type order = {

    }
    type orders = Array<order>

    
    type report = {

    }
    type reports = Array<report>
    
    type review = {

    }
    type reviews = Array<review>

    type category = {
        id: number,
        parent_id: number,
        parent: category,
        name: string,
        image: string,
    }

    type categories = Array<category>

}