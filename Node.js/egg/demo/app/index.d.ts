import {BaseContextClass, Context, IService} from 'egg';
import 'egg'; // Make sure ts to import egg declaration at first


declare module 'egg' {
    export interface Context {
        service: IService;
    }


    export interface IService {
    }


    export class BaseContextClass {
        public ctx: Context;
    }
}
