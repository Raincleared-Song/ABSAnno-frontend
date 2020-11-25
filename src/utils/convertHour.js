export default function convertHour(timestamp) {
    var timestamp2 = new Date(timestamp)
    return  timestamp2.toLocaleDateString().replace(/\//g, "-") + " " + timestamp2.toTimeString().substr(0, 5)
}