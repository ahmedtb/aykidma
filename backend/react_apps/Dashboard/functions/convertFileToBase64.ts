

export default function convertFileToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(<string>reader.result);
        reader.onerror = reject;
    });
}
