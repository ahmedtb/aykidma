import React from "react";

export default function CategoriesTable(props: {
    categories: categories;
    addColumns?: addColumns;
}) {
    const categories = props.categories;
    const addColumns = props.addColumns;

    return (
        <table className="table table-bordered table-striped table-responsive mt-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>الاسم</th>
                    <th>صورة</th>
                    <th>يتبع</th>

                    {addColumns?.map((column, index2) => (
                        <th key={index2}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {categories?.map((category, index) => (
                    <tr key={index}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>

                        <td>
                            <img src={category.image} style={{ width: '100px' }} />
                        </td>
                        <td>
                            {category.parent?.name ?? category.parent_id}
                        </td>

                        {addColumns?.map((column, index2) => (
                            <td key={index2}>
                                {column.content(category, index)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
