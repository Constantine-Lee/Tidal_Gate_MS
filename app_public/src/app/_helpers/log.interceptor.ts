import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const startTime = Date.now();
        let status: string;

        return next.handle(req).pipe(
            tap(
                event => {
                    status = '';
                    if (event instanceof HttpResponse) {
                        status = 'succeeded';
                    }
                },
                error => status = 'failed'
            ),
            finalize(() => {
                const elapsedTime = Date.now() - startTime;
                const keys = req.headers.keys();
                const headers = JSON.stringify(req.headers);
                const body = JSON.stringify({ ...req.body });
                const message = req.method + " " + req.urlWithParams + " " + status
                    + " in " + elapsedTime + "ms" + " headers: " + headers ;
                    //+ " body: " + body;
                this.logDetails(message);
            })
        );
    }
    private logDetails(msg: string) {
        console.log(msg);
    }
} 