import { Params } from '@angular/router';

export class RouteInfo {

  route: string;
  queryParams: Params;
  fragment: string;

  constructor(route: string) {
    this.route = route.match(/^[^\?#]*/)[0];

    let queryParams = {};
    const queryString = route.match(/\?[^#]*/)?.[0];

    if (queryString && queryString.length > 1) {
      const paramPairs = queryString.substr(1).split('&');

      for (let pair of paramPairs) {
        const pairArray = pair.split('=');

        queryParams[pairArray[0]] = pairArray[1];
      }
    }

    this.queryParams = queryParams;

    this.fragment = route.match(/#.*/)?.[0]?.substr(1);
  }
}
