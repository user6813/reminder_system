import { Response } from 'express'

export interface ResponseType<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}