import { matchPath } from 'react-router-dom'

export default function pathInRoutes(routes: allowedRoutesType, path: string) {

    for (let i = 0; i < routes.length ?? 0; i++) {
        if (matchPath({ path: routes[i].path }, path?.split("?")[0]))
            return true
    }
    return false;
}
