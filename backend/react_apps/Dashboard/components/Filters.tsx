import React from "react";
import { Form, Button } from "react-bootstrap";
import apiCallHandler from "../functions/apiCallHandler";
import { AxiosResponse } from "axios";

export function getPaginationParams(pagination: pagination<any>) {
    let params = {};
    if (pagination?.first_page_url) {
        let url = pagination.first_page_url;
        params = Object.fromEntries(
            new URLSearchParams(url.substring(url.indexOf("?")))
        );
    }
    return params;
}

export function SelectFilter(props: {
    options: Array<any>;
    apiCall: (params) => Promise<AxiosResponse>;
    useState: Array<any>;
    property: string;
    label: string;
    defaultValue?: any;
    valueKeyWord: string;
    nameKeyWord: string;
}) {
    const options = props.options;
    const [selectedOption, setSelectedOption] = React.useState<
        string | undefined | null
    >();

    const apiCall = props.apiCall;
    const [data, setdata] = props.useState;

    const property = props.property;
    const label = props.label;
    const defaultValue = props.defaultValue;

    const valueKeyWord = props.valueKeyWord;
    const nameKeyWord = props.nameKeyWord;

    function fetchData(params = null) {
        apiCallHandler(
            async () => await apiCall(params),
            (data) => {
                setdata(data);
            },
            "SelectFilter fetchData",
            true
        );
    }

    return (
        <div>
            <div className="d-flex">
                <Form.Select
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                    }}
                    value={defaultValue ?? selectedOption ?? "undefined"}
                    className="mx-1"
                >
                    <option value={"undefined"}>{label ?? property}</option>
                    {options?.map((option, index) => (
                        <option
                            key={index}
                            value={option[valueKeyWord ?? "value"]}
                        >
                            {option[nameKeyWord ?? "name"]}
                        </option>
                    ))}
                </Form.Select>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        let params = Object.assign(
                            {},
                            selectedOption === "undefined"
                                ? { [property]: undefined }
                                : { [property]: selectedOption }
                        );
                        fetchData(params);
                    }}
                >
                    {"search"}
                </button>
            </div>
        </div>
    );
}

export function NumberFilter(props) {
    const params = props.params;
    const fetchPage = props.fetchPage;
    const property = props.property;
    const label = props.label;

    const [number, setnumber] = React.useState(null);

    return (
        <div className="col-5 border rounded p-1 mx-2">
            <div className="d-flex flex-row my-2 align-items-center">
                <label>{label ?? property}</label>
                <br />
                <input
                    className="form-control ml-1"
                    type="number"
                    onChange={(e) => setnumber(e.target.value)}
                />
                <br />
                <button
                    className="col-2 form-control btn btn-success ml-1"
                    onClick={() => {
                        let newparams = Object.assign(
                            {},
                            number === null ? null : { [property]: number }
                        );
                        fetchPage({ ...params, ...newparams });
                    }}
                >
                    {"filter"}
                </button>
            </div>
        </div>
    );
}

export function ScopeFilter(props) {
    const fetchPage = props.fetchPage;
    const property = props.property;
    const label = props.label;
    let linkParams = Object.fromEntries(new URLSearchParams(location.search));

    return (
        <div className="col-5 border rounded p-1 mx-2">
            <div className="d-flex flex-row my-2 align-items-center">
                <button
                    type="button"
                    className={
                        linkParams?.[property] == "true"
                            ? "btn btn-success mx-2 my-1"
                            : "btn btn-info mx-2 my-1"
                    }
                    onClick={() =>
                        fetchPage(
                            linkParams[property] == "true"
                                ? { ...linkParams, [property]: undefined }
                                : { ...linkParams, [property]: "true" }
                        )
                    }
                >
                    {label ?? property}
                </button>
            </div>
        </div>
    );
}

export function DateFilter(props) {
    const property = props.property;
    const label = props.label;
    const apiCall = props.apiCall;
    const [data, setdata] = props.useState;

    const [date, setdate] = React.useState(null);

    function fetchData(params = null) {
        apiCallHandler(
            async () => await apiCall(params),
            (data) => {
                setdata(data);
            },
            "DateFilter fetchData",
            true
        );
    }
    function isFilterActive() {
        const params = getPaginationParams(data);
        if (params[property]) return true;
        else return false;
    }

    return (
        <div>
            <label>{label ?? property}</label>
            <br />
            <div className="d-flex">
                <input
                    className="form-control"
                    type="date"
                    value={date ?? ""}
                    onChange={(e) => setdate(e.target.value)}
                />
                <br />
                {isFilterActive() ? (
                    <button
                        className="mx-1 btn btn-danger"
                        onClick={() => {
                            setdate(null);
                            let newparams = Object.assign(
                                {},
                                { [property]: undefined }
                            );
                            fetchData({ ...newparams });
                        }}
                    >
                        X
                    </button>
                ) : null}
                <button
                    className="btn btn-success me-1"
                    onClick={() => {
                        let newparams = Object.assign(
                            {},
                            date === null ? null : { [property]: date }
                        );
                        fetchData(newparams);
                    }}
                >
                    {"بحث"}
                </button>
            </div>
        </div>
    );
}

export function TextFilter(props: {
    property: string;
    label: string;
    apiCall: (params) => Promise<AxiosResponse>;
    useState: Array<any>;
    initValue?: string;
}) {
    const property = props.property;
    const label = props.label;
    const apiCall = props.apiCall;
    const [data, setdata] = props.useState;

    const [text, settext] = React.useState(props.initValue ?? null);

    function fetchData(params = null) {
        apiCallHandler(
            async () => await apiCall(params),
            (data) => {
                setdata(data);
            },
            "TextFilter fetchData",
            true
        );
    }

    function isFilterActive() {
        const params = getPaginationParams(data);
        if (params[property]) return true;
        else return false;
    }

    return (
        <div className="my-1">
            <div className="">{label ?? property}</div>
            <div className="d-flex justify-content-around">
                <Form.Control
                    placeholder={label ?? property}
                    className="mx-1"
                    type="text"
                    value={text ?? ""}
                    onChange={(e) => settext(e.target.value)}
                />
                {isFilterActive() ? (
                    <button
                        className="mx-1 btn btn-danger"
                        onClick={() => {
                            settext(null);
                            let newparams = Object.assign(
                                {},
                                { [property]: undefined }
                            );
                            fetchData({ ...newparams });
                        }}
                    >
                        X
                    </button>
                ) : null}
                <button
                    className="btn btn-primary mx-1"
                    onClick={() => {
                        let newparams = Object.assign(
                            {},
                            text === null ? null : { [property]: text }
                        );
                        fetchData({ ...newparams });
                    }}
                >
                    {"بحث"}
                </button>
            </div>
        </div>
    );
}

export function OrderByDescFilter(props) {
    const params = props.params;
    const fetchPage = props.fetchPage;
    const property = props.property;
    const label = props.label;

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <button
                        type="button"
                        className={
                            params?.orderByDesc == property
                                ? "btn btn-success mx-2 my-1"
                                : "btn btn-info mx-2 my-1"
                        }
                        onClick={() =>
                            fetchPage(
                                params["orderByDesc"] == property
                                    ? { ...params, orderByDesc: undefined }
                                    : { ...params, orderByDesc: property }
                            )
                        }
                    >
                        {label ?? property}
                    </button>
                </div>
            </div>
        </>
    );
}
