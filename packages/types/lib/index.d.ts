/// <reference types="node" />
import { IncomingMessage } from 'http';
export declare type Request = {
    request: string; /** Request ID */
};
export declare type RequestResponse = Request & {
    response: any;
};
export declare type HttpRequest = Request & {
    /** HTTP Version */
    http: IncomingMessage['httpVersion'];
    method: IncomingMessage['method'];
    url: IncomingMessage['url'];
    headers: IncomingMessage['headers'];
};
export declare type RequestBody = Request & {
    body: any;
};
export declare type FileSystemRequest = Request & {
    path: string;
} & ({
    action: 'read' | 'delete';
} | {
    action: 'write';
    data: any;
});
export declare function isFileSystemRequest(event: any): event is FileSystemRequest;
