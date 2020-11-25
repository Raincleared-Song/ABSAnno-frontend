export default function convertTime(timestamp) {
    var timestamp2 = new Date(timestamp)
    return  timestamp2.toLocaleDateString().replace(/\//g, "-");
}