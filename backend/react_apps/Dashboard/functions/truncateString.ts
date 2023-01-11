export default function truncateString(str, num = 20) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}