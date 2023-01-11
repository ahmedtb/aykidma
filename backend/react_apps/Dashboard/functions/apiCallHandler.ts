
import logError from "./logError"

import { AxiosResponse } from "axios"

export default async function apiCallHandler(ApiEndpoint: () => Promise<AxiosResponse>, setData: (data :any | null) => void, Identifier: string | null, logData = false) {
    try {
        const response = await ApiEndpoint()
        if (setData)
            setData(response.data)
        if (Identifier && logData)
            console.log(Identifier + ':', response.data)
        return response
    } catch (error) {
        logError(error, Identifier)
        throw error
    }
}