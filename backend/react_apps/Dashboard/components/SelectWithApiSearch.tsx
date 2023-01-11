import React from 'react'
import apiCallHandler from '../functions/apiCallHandler'
import LoadingIndicator from './LoadingIndicator'
import { trackPromise } from "react-promise-tracker";
import ClickAwayListener from 'react-click-away-listener';
import axios, { AxiosResponse } from 'axios';

export default function SelectWithApiSearch(props: {
    setSelectedValue?: (value) => void,
    label: string,
    paginationEndpoint: (params: object) => Promise<AxiosResponse>,
    valueKeyWord?: string,
    nameKeyWord?: string,
    searchKeyWord?: string,
    value?: any
    setSelectedValueObject?: (value) => void,
}) {

    const setSelectedValue = props.setSelectedValue
    const label = props.label
    const paginationEndpoint = props.paginationEndpoint
    const valueKeyWord = props.valueKeyWord
    const nameKeyWord = props.nameKeyWord
    const searchKeyWord = props.searchKeyWord
    const value = props.value
    const setSelectedValueObject = props.setSelectedValueObject

    const [endpointOptions, setendpointOptions] = React.useState<Array<{}>>()
    const [next_page_url, setnext_page_url] = React.useState()

    const [randomStr, setrandomStr] = React.useState(Math.random().toString(36).slice(2, 7))
    const [scrollLoading, setscrollLoading] = React.useState(false)

    const page_size = 30

    React.useEffect(() => {
        trackPromise(
            apiCallHandler(
                () => paginationEndpoint({ page_size: page_size }),
                (responsedata) => {
                    setendpointOptions(oldData => [...responsedata.data])
                    setnext_page_url(responsedata.next_page_url)
                },
                'Select With Api Search use Effect ' + label ?? '',
                true
            )
            , randomStr)
    }, [paginationEndpoint])

    function searchInputChange(q) {
        trackPromise(
            apiCallHandler(
                async () => paginationEndpoint({ [searchKeyWord ?? nameKeyWord]: q, page_size: page_size }),
                (responsedata) => {
                    setendpointOptions(oldData => [...responsedata.data])
                    setnext_page_url(responsedata.next_page_url)
                },
                'Select With Api Search search Input Change ' + label ?? '',
                true
            )
            , randomStr)
    }

    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
        if (bottom && next_page_url && !scrollLoading) {
            setscrollLoading(true)
            trackPromise(
                apiCallHandler(
                    async () => axios.get(next_page_url),
                    (data) => {
                        setendpointOptions(oldData => [...oldData, ...data.data])
                        setnext_page_url(data.next_page_url)
                        setscrollLoading(false)

                    },
                    'Select With Api Search handleScroll ' + label ?? '',
                    true
                )
                , randomStr)
        }
    }
    React.useEffect(() => {

    }, [endpointOptions])

    function selectedOption() {
        const fromloadedOptions = endpointOptions?.find(option => option[valueKeyWord ?? 'value'] == value)
        if (!fromloadedOptions) {
            // return { [nameKeyWord ?? 'name']: value }
        }
        return fromloadedOptions
    }
    function selectedOptionForValue(value) {
        if (value)
            return endpointOptions?.find(option => option[valueKeyWord ?? 'value'] == value)
    }

    const [display, setdisplay] = React.useState('none')


    return (
        <ClickAwayListener onClickAway={() => { setdisplay('none') }}>

            <div className='dropdown'>
                <div
                    className='bg-white border border-dark p-2 rounded'
                    onClick={() => { setdisplay(display == 'block' ? 'none' : 'block') }}
                >
                    {selectedOption() ? selectedOption()[nameKeyWord ?? 'name'] : (value ?? label)}
                </div>

                <div className='dropdown-content w-100' style={{ display: display }}>
                    <input type='text' className='mb-1 rounded px-2 py-1 w-100' onChange={e => { searchInputChange(e.target.value) }} placeholder={label} />

                    <select
                        className="form-control w-100 mx-auto"
                        onChange={(e) => {
                            if (setSelectedValue)
                                setSelectedValue(e.target.value)
                            if (setSelectedValueObject)
                                setSelectedValueObject(selectedOptionForValue(e.target.value))
                            setdisplay('none')
                        }}
                        size={5}
                        value={value ?? ''}
                        onScroll={handleScroll}
                    >
                        <option value={undefined}>{''}</option>
                        {
                            endpointOptions?.map((option, index) => (
                                <option key={index} value={option[valueKeyWord ?? 'value']}>{option[nameKeyWord ?? 'name']}</option>
                            ))
                        }
                    </select>
                    <LoadingIndicator area={randomStr} />

                </div>
            </div>
        </ClickAwayListener>

    )

}