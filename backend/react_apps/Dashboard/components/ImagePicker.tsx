import React from "react";
import convertFileToBase64 from "../functions/convertFileToBase64";
import { Api } from "../utility/Urls";
import logError from "../functions/logError";

// export const getBase64FromUrl = async (url) => {
//     try {
//         const data = (await Api.fetchBase64DataFromUrl(url)).data;
//         console.log("getBase64FromUrl data length", data.length);
//         return data;
//     } catch (error) {
//         logError(error);
//     }
// };

export default function ImagePicker(props: {
    setImage: (base64: string) => void;
    maxSize: number;
}) {
    const setImage = props.setImage;
    const maxSize = props.maxSize;

    const [url, seturl] = React.useState(null);
    // const [fromURL, setFromURL] = React.useState(false);

    return (
        <div>

            <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.gif"
                onChange={(e) => {
                    const file = e.target.files[0];

                    convertFileToBase64(file).then((base64) => {
                        if (base64.length > maxSize)
                            alert(
                                "يجب ان لا يتجاوز حجم الصورة " +
                                maxSize / 1024 +
                                " Kb"
                            );
                        else setImage(base64);
                    });
                }}
            />

        </div>
    );
}
