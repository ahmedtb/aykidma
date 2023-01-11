import { matchPath } from 'react-router-dom'

export default function pathEquals(routePath: string, path: string) {

    if (matchPath({ path: routePath }, path?.split("?")[0]))
        return true
    return false;
}
