
type action<T> = { actionType: 'set object' | 'change property' | 'remove property' | 'add property' | 'add object properties', property?: keyof T, object?: T, value?: T[keyof T] }

export type reducerGenericType<T> = (
    prevState: T,
    action: { actionType: 'set object' | 'change property' | 'remove property' | 'add property' | 'add object properties', property?: keyof T, object?: T, value?: T[keyof T] }
) => T

export function changeProperty<T>(dispatchColumns: (arg: action<T>) => void, property: keyof T, value: T[keyof T]) {
    dispatchColumns({ actionType: 'change property', property: property, value: value })

}


export default function objectUseReducerFunction<T, A extends action<T>>(object: T, action: A) {
    let newobject = { ...object }

    switch (action.actionType) {
        case 'set object':
            return action.object
        case 'change property':
            newobject[action.property] = action.value
            return newobject

        case 'remove property':
            delete newobject[action.property];
            return newobject

        case 'add property':
            newobject[action.property] = action.value
            return newobject

        case 'add object properties':
            console.log('add object', (action.object))
            return { ...newobject, ...action.object }

    }
    return object;
}
