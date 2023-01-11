export default function getFileNameExtension(fileName: string): string | undefined {

    return fileName.split('.').pop();
}