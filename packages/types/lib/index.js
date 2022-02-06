"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileSystemRequest = void 0;
function isFileSystemRequest(event) {
    if (typeof event !== 'object')
        return false;
    if (typeof event.request !== 'string')
        return false;
    if (typeof event.path !== 'string')
        return false;
    if (typeof event.action !== 'string')
        return false;
    if (!['read', 'delete', 'write'].includes(event.action))
        return false;
    return true;
}
exports.isFileSystemRequest = isFileSystemRequest;
