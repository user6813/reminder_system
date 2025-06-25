import { Response } from 'express'

export interface ResponseType {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}