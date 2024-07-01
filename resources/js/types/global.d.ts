import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import * as ol from 'ol';

declare global {
    interface Window {
        axios: AxiosInstance;
        ol: typeof ol;
    }

    var route: typeof ziggyRoute;
}
