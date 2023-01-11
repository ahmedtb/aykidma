import React from 'react'
import ClickAwayListener from 'react-click-away-listener';

export default function SelectSearchFromOptions(props: {
    options: Array<object>,
    setSelectedValue: (value) => void,
    setSelectedOption?: (option) => void,
    label: string,
    valueKeyWord?: string,
    nameKeyWord?: string,
    value?: any,
    inputClassName?: string,
}) {
    const options = props.options

    const setSelectedValue = props.setSelectedValue
    const setSelectedOption = props.setSelectedOption

    const label = props.label
    const valueKeyWord = props.valueKeyWord
    const nameKeyWord = props.nameKeyWord
    const value = props.value

    const inputClassName = props.inputClassName



    const [filterdOptions, setFilterdOptions] = React.useState(options)


    React.useEffect(() => {
        setFilterdOptions(options)
    }, [options])

    function searchInputChange(q) {

        setFilterdOptions(options.filter(option => {
            return option[nameKeyWord ?? 'name'].slice(0, q.length).toLowerCase() == q.toLowerCase()
        }))
    }

    function selectedOption() {
        if (filterdOptions)
            return filterdOptions?.find(option => option[valueKeyWord ?? 'value'] == value)
    }
    function selectedOptionForValue(value) {
        if (value)
            return filterdOptions?.find(option => option[valueKeyWord ?? 'value'] == value)

    }

    const [display, setdisplay] = React.useState('none')


    return (
        <ClickAwayListener onClickAway={() => { setdisplay('none') }}>


            <div className='dropdown'>
                <div
                    className={inputClassName ?? 'bg-white border p-2 rounded'}
                    onClick={() => { setdisplay(display == 'block' ? 'none' : 'block') }}
                >
                    {selectedOption() ? selectedOption()[nameKeyWord ?? 'name'] : label}
                </div>

                <div className='dropdown-content' style={{ display: display }} >
                    <input type='text' onChange={e => { searchInputChange(e.target.value) }} placeholder={label} />
                    <select
                        className="form-control"
                        onChange={(e) => {
                            setSelectedValue(e.target.value)
                            if (setSelectedOption)
                                setSelectedOption(selectedOptionForValue(e.target.value))
                            setdisplay('none')
                        }}
                        size={5}
                        value={value ?? ''}
                    >
                        <option value={null}>{''}</option>
                        {
                            filterdOptions?.map((option, index) => (
                                <option key={index} value={option[valueKeyWord ?? 'value']}>{option[nameKeyWord ?? 'name']}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </ClickAwayListener>


    )
}