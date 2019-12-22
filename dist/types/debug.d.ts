export default function debug(name: string, log?: {
    (message?: any, ...optionalParams: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}): (message?: any, ...optionalParams: any[]) => void;
