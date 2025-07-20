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


// downlink: 当前网络连接的估计下行速度（单位为 Mbps）
// downlinkMax: 设备网络连接最大可能下行速度（单位为 Mbps）
// effectiveType: 当前网络连接的估计速度类型（如 slow-2g、2g、3g、4g 等）
// rtt: 当前网络连接的估计往返时间（单位为毫秒），表示设备当前的往返延迟时间（Round-Trip Time），以毫秒为单位。它是从设备发送数据到服务器并返回的时间。
// saveData: 是否处于数据节省模式，表示用户设备当前是否处于节省数据模式。可能的取值为 true（用户启用了节省数据模式）或 false（用户未启用节省数据模式）