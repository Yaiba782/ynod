import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function backendFactory(backend: MockBackend, options: BaseRequestOptions) { 
    backend.connections.subscribe((connection: MockConnection) => {
        let testUser = { username: 'test', password: 'test', firstName: 'Nom', lastName: 'Prenom' , balance: 0};
        setTimeout(() => { 
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) { 
                let params = JSON.parse(connection.request.getBody()); 
                if (params.username === testUser.username && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'FT' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }MockBackend
            } 

            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer FT') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: [testUser] })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }

        }, 500);

    });

    return new Http(backend, options);
}

export let BackendProvider = { 
    provide: Http,
    useFactory: backendFactory,
    deps: [MockBackend, BaseRequestOptions]
};