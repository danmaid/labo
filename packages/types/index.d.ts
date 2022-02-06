/// <reference types="node" />
import { IncomingMessage } from 'http';
export declare type HttpRequest = {
    /** Request ID (Generated) */
    request: string;
    /** HTTP Version */
    http: IncomingMessage['httpVersion'];
} & Pick<IncomingMessage, 'method' | 'url' | 'headers'>;
export declare type RequestBody = {
    request: HttpRequest['request'];
    body: any;
};
export interface ResponseBody {
    request: HttpRequest['request'];
    result: any;
}
