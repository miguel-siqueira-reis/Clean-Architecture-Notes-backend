export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest<B = any> {
  body: B;
}
