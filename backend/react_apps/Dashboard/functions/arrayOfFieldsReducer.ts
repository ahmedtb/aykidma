export function arrayOfFieldsObject(fields) {
    return {
        class: "App\\FieldsTypes\\ArrayOfFields",
        fields: fields
    }
}

export function arrayOfFieldsReducer(array_of_fields, action) {
    switch (action.actionType) {
        case 'set array_of_fields':
            return action.array_of_fields
        case 'change field':
            return arrayOfFieldsObject(
                array_of_fields.fields.map((field, index) => {
                    if (index == action.index)
                        return action.field;
                    return field;
                })
            )

        case 'remove field':
            return arrayOfFieldsObject(
                array_of_fields.fields.filter((value, index) => {
                    return index != action.index;
                })
            )
        case 'add field':
            return arrayOfFieldsObject([...array_of_fields.fields, action.field])

        case 'insert field':

            return arrayOfFieldsObject(
                array_of_fields.fields.slice(0, action.index).concat(action.field, array_of_fields.fields.slice(action.index))
            )

        case 'add fields':
            console.log('add fields', (action.fields))
            return arrayOfFieldsObject(array_of_fields.fields.concat(action.fields))

        case 'set original dir':
            return arrayOfFieldsObject(array_of_fields.fields)
        case 'set translated dir':
            return arrayOfFieldsObject(array_of_fields.fields)


        case 'left up field':
            let leftup = [...array_of_fields.fields];
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return arrayOfFieldsObject(leftup)
        case 'left down field':
            let leftdown = [...array_of_fields.fields];
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return arrayOfFieldsObject(leftdown)

    }
    return array_of_fields;
}