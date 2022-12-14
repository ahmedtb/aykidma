import React from 'react'
import {BsCardList} from 'react-icons/bs'


export const TextAreaFieldClass = 'App\\FieldsTypes\\TextAreaField'

export function TextAreaFieldInput(props) {

    const field = props.field
    const dispatch = props.dispatch
    return <div >
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</div>
        {(field.subLabel) ? (<div style={{ fontSize: 12 }}>{field.subLabel}</div>) : (null)}

        <input
              style={{ borderWidth: 1, borderRadius: 10, marginTop: 5 }}
            onChange={(e) => {
                dispatch(e.target.value)
            }}
            value={field.value}
        />
    </div>
}
export function TextAreaFieldRender(props) {
    const field = props.field
    return <div >
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{field.label}</div>
        {(field.subLabel) ? (<div style={{ fontSize: 12 }}>{field.subLabel}</div>) : (null)}

        <textarea
            value={field.value??''}
            disabled
        />
    </div>
}

export function TextAreaFieldFormView(props) {
    const field = props.field

    return <div style={{
        marginRight: 8,
        borderWidth: 0.5,
        borderColor: '#d1c5c5',
        borderRadius: 10,
        marginTop: 5,
    }}>
        <div style={{ flexDirection: 'row', borderBottomWidth: 0.5, }}>
        <BsCardList size={24} />
            <div style={{ marginLeft: 5, flex: 1, }}>
                <div style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{field.label}</div>
                <div style={{ color: 'grey', fontSize: 10, }}>حقل منطفة نصية</div>
            </div>
        </div>
        <div style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 15, backgroundColor: '#f5f0f0' }}>{field.value}</div>
    </div>
}

export function TextAreaFieldCreator(props) {
    const set = props.set
    return <div style={{ marginTop: 10 }}>
        <div>اكتب النص الذي يصف مساحة النص هذه للزبون</div>
        <input
            style={{ borderWidth: 1, borderRadius: 10, marginTop: 5 }}
            onChange={(e) => {
                set({
                    label: e.target.value, class: TextAreaFieldClass, value: null
                })
            }}
        />
    </div>
}

export function TextAreaFieldEditor(props) {

    const field = props.field
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(field.label)
    const [subLabel, setsubLabel] = React.useState(field.subLabel)

    const [value, setvalue] = React.useState(field.value)

    return <div style={{ marginTop: 15 }}>
        <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>حقل مساحة نصية</div>
        </div>
        <input style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
            onChange={(e) => {
                setlabel(e.target.value)
                dispatch({
                    class: TextAreaFieldClass, label: e.target.value, setsubLabel: subLabel, value: value
                })
            }}
            value={field.label}
        />
        {(field.subLabel) ? (
            <input style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 7 }}
                onChange={(e) => {
                    setsubLabel(e.target.value)
                    dispatch({
                        class: TextAreaFieldClass, label: label, setsubLabel: e.target.value, value: value
                    })
                }}
                value={field.subLabel}
            />
        ) : null}

        <div style={{ borderWidth: 1, borderColor: '#e4f0ec', borderRadius: 10, marginTop: 5, padding: 30, backgroundColor: 'grey' }} />
    </div>
}
