

export default function alertError(error) {

    if (error?.response?.data?.errors) {
        let message = ''
        for (const property in error?.response?.data?.errors) {
            message += `${property}: ${error?.response?.data?.errors[property]}\n`
        }
        alert(message);
    } else if (error?.response?.status == 404) {
        alert(
            'exception: ' + error?.response?.data?.exception + '\n'
            + 'url: ' + error?.response?.config?.url
        )
    } else if (error?.response?.status == 401) {
        alert(
            'message: Unauthenticated \n'
            + 'url:  ' + error?.response?.config?.url
        )
    } else if (error?.response?.status == 500) {
        alert(
            'message: ' + error.response?.data?.message + '\n'
            + 'url: ' + error?.response?.config?.url
        )
    }
}