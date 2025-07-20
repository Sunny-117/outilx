export function getNetWorkInfo() {
    let info;
    if (navigator.onLine) {
        info = {
            status: "online",
            type: navigator.connection.effectiveType,
            rtt: navigator.connection.rtt,
            downlink: navigator.connection.downlink,
        };
    } else {
        info = {
            status: "offline",
        };
    }
    return info;
}

// window.addEventListener("online", () => {
//     getNetWorkInfo();
// });
// window.addEventListener("offline", () => {
//     getNetWorkInfo();
// });
// navigator.connection.addEventListener("change", () => {
//     getNetWorkInfo();
// });
