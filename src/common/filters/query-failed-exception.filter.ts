import { QueryFailedError } from 'typeorm';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus
} from '@nestjs/common';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const { message } = exception;
        const errorResponse = { success: false, message };

        // @ts-ignore
        response.status(HttpStatus.BAD_REQUEST).send(errorResponse);
    }
}
