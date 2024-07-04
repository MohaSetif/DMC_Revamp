import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    email_verified_at: string;
}

export interface Usertype {
    name: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        usertype: Usertype
    };
    ziggy: Config & { location: string };
};
