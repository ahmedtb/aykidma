import React from "react";
import { Api } from "../utility/Urls";
import objectUseReducerFunction, {
    reducerGenericType,
} from "../functions/objectUseReducerFunction";
import apiCallHandler from "../functions/apiCallHandler";
import { Form } from "react-bootstrap";
import SelectWithApiSearch from "../components/SelectWithApiSearch";

export default function CategoryEdit(props: {
    category: category;
    change: () => void;
}) {
    const category = props.category;
    const change = props.change;

    const [columns, dispatchColumns] = React.useReducer<
        reducerGenericType<category>
    >(objectUseReducerFunction, { ...category });

    React.useEffect(() => {
        dispatchColumns({ actionType: "set object", object: category });
    }, [category]);

    async function submit() {
        apiCallHandler(
            () => Api.editcategory(category?.id, columns),
            (data) => {
                change();
            },
            "Category Edit",
            true
        );
    }

    return (
        <div className="">
            <Form.Group className="mb-3">
                <Form.Label>الاسم</Form.Label>
                <Form.Control
                    type="text"
                    value={columns?.name ?? ""}
                    onChange={(e) =>
                        dispatchColumns({
                            actionType: "change property",
                            property: "name",
                            value: e.target.value,
                        })
                    }
                />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>يتبع</Form.Label>
                <SelectWithApiSearch
                    paginationEndpoint={Api.fetchCategories}
                    setSelectedValue={(value) =>
                        dispatchColumns({
                            actionType: "change property",
                            property: "parent_id",
                            value: value,
                        })
                    }
                    label={"يتبع"}
                    valueKeyWord="id"
                    nameKeyWord="name"
                    value={columns?.parent_id}
                />
            </Form.Group>



            <div className="my-2 d-flex justify-content-center">
                <input
                    onClick={submit}
                    type="button"
                    className="btn btn-success"
                    value="تعديل"
                />
            </div>
        </div>
    );
}
