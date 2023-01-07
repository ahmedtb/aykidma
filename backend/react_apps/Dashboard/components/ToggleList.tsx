import React from 'react'
import { Link } from 'react-router-dom';
import {
    BsDot,
} from 'react-icons/bs'
import {
    AiOutlineLeft,
    AiOutlineDown
} from 'react-icons/ai'
import pathInRoutes from '../utility/pathInRoutes';

export default function ToggleList(props) {
    const [show, setshow] = React.useState(false)
    const links = props.links
    const label = props.label
    const hide = props.hide
    const allowedRoutes = props.allowedRoutes
    const allowAllRoutes = props.allowAllRoutes

    const [renderdLinksList, setrenderdLinksList] = React.useState([])


    React.useEffect(() => {
        if (links) {
            let renderdLinksList2 = []

            links?.forEach((link, index) => {
                if (allowAllRoutes || pathInRoutes(allowedRoutes, link.to))
                    renderdLinksList2.push(<Link key={index} className='my-2 text-white on-hover-text-green text-decoration-none' to={link.to}>
                        <div className='d-flex'>
                            <BsDot size={30} />
                            <div>
                                {link.label}
                            </div>
                        </div>
                    </Link>)
            })
            setrenderdLinksList(renderdLinksList2)
        }
    }, [links])


    if (hide) return null
    else
        return <div>
            {
                renderdLinksList?.length ? <a className='d-flex justify-content-between align-items-center text-white on-hover-text-green text-decoration-none cursor-pointer' onClick={() => setshow(!show)}>
                    <div>{label}</div>
                    {
                        show ? <AiOutlineDown size={15} /> : <AiOutlineLeft size={15} />
                    }
                    
                </a> : null
            }

            {
                show && renderdLinksList?.length  ? < div className='bg-secondary bg-opacity-25 rounded p-1 m-1'>
                    {renderdLinksList}
                </div> : null
            }
        </div >
}