/**
 * Retrieves the current network status and connection information of the user's device.
 *
 * @returns {object} An object containing network status and, if online, additional connection details:
 * - `status`: `"online"` or `"offline"`.
 * - `type` (optional): The effective type of the connection (e.g., '4g', '3g', etc.).
 * - `rtt` (optional): The estimated effective round-trip time of the current connection, in milliseconds.
 * - `downlink` (optional): The effective bandwidth estimate in megabits per second.
 *
 * @remarks
 * If the device is offline, only the `status` property will be present.
 * The `navigator.connection` API may not be supported in all browsers.
 */
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
