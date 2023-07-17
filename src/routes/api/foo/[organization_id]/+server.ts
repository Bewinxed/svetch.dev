import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    
    return new Response();
};

export const POST: RequestHandler = async ({request, params, url}) => {
    const premium = url.searchParams.get('premium')
    const payload = await request.json() as {name: string, age: number, email: string}

    const user = {id: 1, ...payload}

    return new Response(
        JSON.stringify(user),
    );
};