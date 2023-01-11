import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

import { ThreeDots } from 'react-loader-spinner';

export default function LoadingIndicator(props: { area: string }) {

    const { promiseInProgress } = usePromiseTracker({ area: props.area });


    return (
        promiseInProgress ? <div
            className="w-100 h-100 d-flex justify-content-center align-items-center"
        >
            <ThreeDots color="#2BAD60" height="100" width="100" />
        </div> : <></>
    );
}