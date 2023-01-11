import React from "react";
import Paginator from "../components/Paginator";
import CategoriesTable from "./CategoriesTable";
import { getPaginationParams, TextFilter } from "../components/Filters";
import CustomModal from "../components/CustomModal";
import { Api } from "../utility/Urls";
import apiCallHandler from "../functions/apiCallHandler";
import CategoryEdit from "./CategoryEdit";
import objectUseReducerFunction, {
    reducerGenericType,
} from "../functions/objectUseReducerFunction";
import SelectWithApiSearch from "../components/SelectWithApiSearch";
import ImagePicker from "../components/ImagePicker";

export default function CategoryEditCreate() {
    const [categoriesPagination, setcategoriesPagination] =
        React.useState<pagination<categories>>();
    const [update, setupdate] = React.useState<number>();

    function deleteCategory(id: number) {
        apiCallHandler(
            () => Api.destroyCategory(id),
            (data) => setupdate(Math.random()),
            "Categories Index delete Category",
            true
        );
    }

    function fetch(params: object) {
        return Api.fetchCategories({
            ...getPaginationParams(categoriesPagination),
            ...params,
            with: 'parent',
        });
    }

    const [columns, dispatchColumns] = React.useReducer<
        reducerGenericType<category>
    >(objectUseReducerFunction, null);

    function submit() {
        apiCallHandler(
            () => Api.createCategory(columns),
            (data) => {
                setupdate(Math.random());
            },
            "Create Category",
            true
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="fs-3 fw-bold d-flex justify-content-between">
                    <div>إضافة وتعديل تصنيف</div>
                </div>

                <div className="d-flex justify-content-end">
                    <TextFilter
                        property="name"
                        label="الاسم"
                        apiCall={fetch}
                        useState={[
                            categoriesPagination,
                            setcategoriesPagination,
                        ]}
                    />
                    <TextFilter
                        property="parent_name"
                        label="يتبع"
                        apiCall={fetch}
                        useState={[
                            categoriesPagination,
                            setcategoriesPagination,
                        ]}
                    />
                </div>
                <CategoriesTable
                    categories={categoriesPagination?.data}
                    addColumns={[
                        {
                            title: "إجراءات",
                            content: (category: category, index) => (
                                <div className="d-flex">
                                    <CustomModal
                                        buttonClass="btn btn-danger"
                                        label={"حذف"}
                                        children={(handleClose, handleShow) => (
                                            <>
                                                <div className="fs-5 ">
                                                    هل تريد فعلاً حذف التصنيف
                                                    "سيتم حذف كل ما يتبعها"
                                                </div>
                                                <div className="d-flex justify-content-around my-5 col-3 mx-auto">
                                                    <button
                                                        className="btn btn-danger mx-1 w-50"
                                                        onClick={() =>
                                                            deleteCategory(
                                                                category.id
                                                            )
                                                        }
                                                        data-bs-dismiss="modal"
                                                    >
                                                        {"نعم"}
                                                    </button>
                                                    <button
                                                        onClick={handleClose}
                                                        className="btn btn-secondary mx-1 w-50"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        لا
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    />

                                    <CustomModal
                                        buttonClass="btn btn-primary mx-2"
                                        label={"تعديل"}
                                        children={(handleClose, handleShow) => (
                                            <>
                                                <CategoryEdit
                                                    category={category}
                                                    change={() =>
                                                        setupdate(Math.random())
                                                    }
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
                <Paginator
                    update={update}
                    log={"category index"}
                    apiCall={fetch}
                    useState={[categoriesPagination, setcategoriesPagination]}
                />

                <div className="my-5 pb-5">
                    <div className="fs-3 fw-bold">إضافة تصنيف</div>
                    <div className="d-flex mt-3">
                        <div>
                            <div className="form-label">الاسم</div>
                            <input
                                type="text"
                                className="form-control"
                                value={columns?.name ?? ""}
                                onChange={(e) =>
                                    dispatchColumns({
                                        actionType: "change property",
                                        property: "name",
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>



                        <div className="w-25">
                            <div className="form-label">يتبع</div>
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
                        </div>

                        <div className="col-3">
                            <div className="form-label fw-bold">
                                صورة التصنيف
                            </div>
                            <img
                                className="w-25 d-block mx-auto"
                                onClick={() => { }}
                                src={columns?.image}
                            />
                            <ImagePicker
                                maxSize={1024 * 1024}
                                setImage={(base64) => {
                                    dispatchColumns({
                                        actionType: "change property",
                                        property: "image",
                                        value: base64,
                                    });
                                }}
                            />
                        </div>


                    </div>

                    <div className="d-flex my-2">
                        <input
                            onClick={submit}
                            type="button"
                            className="btn btn-success"
                            value="تسجيل"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
