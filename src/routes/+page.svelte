<script lang="ts">
	import Icon from '@iconify/svelte';
	import { prism } from 'svelte-prism-action';
	
	let serverCode = `
    // <span class="badge badge-outline">src/foo/<span class="badge badge-accent text-white font-bold text-black">[organization_id]</span>/server.ts</span>

        export const POST: RequestHandler = async ({request, params, url}) => {
        const <span class="badge badge-accent">premium</span> = url.searchParams.get('premium')
        const <span class="badge badge-primary">payload</span> = await request.json() as <span class="badge badge-primary">{name: string, age: number, email: string}</span>

        const user = {id: 1, ...payload}

        return new Response(
            JSON.stringify(<span class="badge badge-secondary font-bold text-black">user</span>),
        );
    };`;

	// new Svetch().post('foo', {

	// })

	let clientCode = `
    import {Svetch} from 'src/lib/client'
    
    const svetch = new Svetch()

    const <span class="badge badge-secondary font-bold text-black">user</span> = svetch.post('<span class="badge badge-outline">foo</span>',
        {
            path: {
                <span class="badge badge-accent text-white font-bold text-black">organization_id</span>: 1
            },
            query: {
                <span class="badge badge-accent text-white font-bold text-black">premium</span>: true
            },
            body: <span class="badge badge-primary h-fit w-fit rounded-md">{
            name: 'foo',
            age: 12,
            email: 'foo@bar.com'
}</span>
        }
    )`;

	const type_example = `
    export interface APIPaths {
	'foo/:organization_id': {
		GET: {
			parameters: {
				path: { organization_id: string };
				query?: never;
			};
			responses: {};
			errors: {};
		};
		POST: {
			parameters: {
				path: { organization_id: string };
				body: {
					name: string;
					age: number;
					email: string;
				};
				query: { premium: string };
			};
			responses: {
				200: string;
			};
			errors: {};
		};
	};
}`;

	const zod_example = `
import { z } from 'zod';

export const schema = z.object({
	'foo/:organization_id': z.object({
		GET: z.object({
			parameters: z.object({ path: z.object({ organization_id: z.string() }) }),
			responses: z.object({}),
			errors: z.object({})
		}),
		POST: z.object({
			parameters: z.object({
				path: z.object({ organization_id: z.string() }),
				body: z.object({ name: z.string(), age: z.number(), email: z.string() }),
				query: z.object({ premium: z.string() })
			}),
			responses: z.object({ '200': z.string() }),
			errors: z.object({})
		})
	})
});
`;
</script>

<head>
	<link href="https://unpkg.com/prismjs@1.22.0/themes/prism.css" rel="stylesheet" />
</head>

<!-- <button on:click={
	() => {
		fetch('/telemetry', {
			method: 'post',
			body: JSON.stringify(payload)
		})
	}
}>send</button> -->

<div main use:prism class="flex flex-col h-screen bg-gray-200 overflow-x-hidden">
	<div class="container mx-auto px-4 sm:px-6 md:px-8">
		<div class="hero h-80">
			<div
				class="hero-content text-center bg-cover bg-center h-full w-full"
				style="background-image: url(https://github.com/Bewinxed/svetch/assets/9145989/67c36f21-a21e-42f1-ba50-42f457948c46);"
			>
				<div class="max-w-md space-y-2 flex flex-col place-items-end" />
			</div>
		</div>
		<div class="divider" />
		<div class="flex flex-col space-y-10 md:space-y-0 md:space-x-10 p-0 md:p-10">
			<div class="flex-1">
				<div class="flex place-content-center place-items-center flex-col space-y-4">
					<h1 class="text-5xl font-bold">Svetch.ts</h1>
					<p class="text-gray-500">Typesafety, Minus the typing 😉</p>
					<!-- link to the repo with icon -->
					<a href="https://github.com/Bewinxed/svetch" class="btn btn-outline w-32 justify-center">
						<Icon inline icon="mingcute:github-line" />
						Github
					</a>
					<a
						href="https://www.npmjs.com/package/svetch.ts"
						class="btn btn-outline w-32 justify-center"
					>
						<Icon inline icon="logos:npm-icon" />
						NPM
					</a>
				</div>
				<div class="divider" />
				<h2 class="text-xl font-bold mb-2 tab tab-lifted">Server Code</h2>
				<div class="mockup-code">
					<pre>
            <span class="text-gray-500">install from npm</span>
            <code>npm install svetch.ts</code>
            <span class="text-gray-500">// use</span>
            <code>npx svetch.ts</code>
          </pre>
				</div>
			</div>
			<div class="flex-1">
				<h1 class="text-xl font-bold mb-2">By writing your endpoints as you usually do 👇</h1>
				<h2 class="text-xl font-bold mb-2 tab tab-lifted">Server Code</h2>
				<div class="mockup-code">
					<pre class=""><code>{@html serverCode}</code></pre>
				</div>
			</div>
			<div class="divider" />
			<div class="flex-1">
				<h1 class="text-xl font-bold mb-2">You get intellisense on all your API parameters 👌</h1>
				<h2 class="text-xl font-bold mb-2 tab tab-lifted">Client Code</h2>
				<div class="mockup-code relative">
					<pre class=""><code>{@html clientCode}</code></pre>
				</div>
				<h1 class="text-xl font-bold mb-2">
					The return type will be inferred from the API without having to manually add types
				</h1>
			</div>
			<div class="divider" />
			<div class="flex-1">
				<h1 class="text-xl font-bold mb-2">All your APIs will have generated types 👇</h1>
				<h2 class="text-xl font-bold mb-2 tab tab-lifted">/lib/api/api.ts</h2>
				<div class="mockup-code">
					<pre class=""><code class="lang-typescript">{@html type_example}</code></pre>
				</div>
			</div>
			<div class="flex-1">
				<h1 class="text-xl font-bold mb-2">
					And zod schemas, which the client can automatically validate on any request 👇
				</h1>
				<h2 class="text-xl font-bold mb-2 tab tab-lifted">/lib/api/zod.ts</h2>
				<div class="mockup-code">
					<pre class=""><code class="lang-typescript">{@html zod_example}</code></pre>
				</div>
			</div>
			<div class="divider" />
			<div class="hero h-fit bg-base-200">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-xl font-bold">
							It will also auto generate BEAUTIFUL and functional API docs for testing &
							documentation
						</h1>
						<a href="/docs" class="btn btn-primary w-32 justify-center">
							<Icon inline icon="mingcute:book-line" />
							Sample Docs
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
