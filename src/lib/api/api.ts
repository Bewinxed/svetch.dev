
export interface Get<
    PathParams = { [key: string]: unknown },
    QueryParams = { [key: string]: unknown },
    Output = { [key: string]: unknown }
> {
    parameters: {
        path?: PathParams;
        query: QueryParams;
    };
    responses: {
        200: Output;
    };
}

export interface Post<
    PathParams = { [key: string]: unknown },
    RequestBody = { [key: string]: unknown },
    QueryParams = { [key: string]: unknown },
    Output = { [key: string]: unknown }
> {
    parameters: {
        path?: PathParams;
        body: RequestBody;
        query?: QueryParams;
    };
    responses: {
        200: Output;
    };
}

export interface Put<
    PathParams = { [key: string]: unknown },
    RequestBody = { [key: string]: unknown },
    QueryParams = { [key: string]: unknown },
    Output = { [key: string]: unknown }
> {
    parameters: {
        path?: PathParams;
        body: RequestBody;
        query?: QueryParams;
    };
    responses: {
        200: Output;
    };
}

export interface Delete<
    PathParams = { [key: string]: unknown },
    QueryParams = { [key: string]: unknown },
    Output = { [key: string]: unknown }
> {
    parameters: {
        path?: PathParams;
        query: QueryParams;
    };
    responses: {
        200: Output;
    };
}

export interface Patch<
    PathParams = { [key: string]: unknown },
    RequestBody = { [key: string]: unknown },
    QueryParams = { [key: string]: unknown },
    Output = { [key: string]: unknown }
> {
    parameters: {
        path?: PathParams;
        body: RequestBody;
        query?: QueryParams;
    };
    responses: {
        200: Output;
    };
}

export type RecursiveJSONSchema = {
    description?: string
    type: string
    const?: string
    format?: string
    properties?: {
        [key: string]: RecursiveJSONSchema
    }
    items?: RecursiveJSONSchema
    required?: string[]
}
export interface APIPaths {
  'me/bewinxed/Downloads/GuardianGeckoBot/templates/svetch.ts/src/routes/telemetry': {
    POST: {
      parameters: {
        path?: never,
        body: {
  _id: string;
  project: string;
  timestamp: number;
  data: {
    session_id: string;
    script_name: string;
    script_version?: string;
    operating_system: string;
    node_version: string;
    npm_version: string;
    processed_files_count: number;
    generated_lines_of_code: number;
    processed_endpoints: {
      [index: string]: number;
    };
    encountered_errors: boolean;
    error_messages: string[];
    custom_events?: Array<
      {
        event_name: string;
        event_properties?: {
          [index: string]: any;
        };
      }
    >;
  };
},
        query?: never,
      },
      responses: {
        200: {
          error: "Invalid payload",
        } | any,
      }
      errors: {
      }
    },
  },
  'foo/:organization_id': {
    GET: {
      parameters: {
        path: { organization_id: string;  },
        query?: never,
      },
      responses: {
      }
      errors: {
      }
    },
    POST: {
      parameters: {
        path: { organization_id: string;  },
        body: {
  name: string;
  age: number;
  email: string;
},
        query: { premium: string; },
      },
      responses: {
        200: string,
      }
      errors: {
      }
    },
  },
};
export interface ActionPaths {
};
