import { matchPath } from 'react-router-dom'

export default function pathInRoutes(routes, path) {

    if (path)
        for (let i = 0; i < routes.length ?? 0; i++) {
            if (matchPath(path?.split("?")[0], { path: routes[i].path, exact: routes[i].exact, strict: true }))
                return true
        }
    return false;
}
