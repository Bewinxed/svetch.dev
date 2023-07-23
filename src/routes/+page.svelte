<script lang="ts">
	import Icon from '@iconify/svelte';
	import { prism } from 'svelte-prism-action';

	export let data;

	const { stats } = data;

	const text_colors: Record<string, string> = {
		GET: 'text-green-500',
		POST: 'text-blue-500',
		PUT: 'text-yellow-500',
		DELETE: 'text-red-500',
		PATCH: 'text-purple-500'
	};

	// icons for each HTTP method
	const icons: Record<string, string> = {
		GET: 'carbon:document-download',
		POST: 'carbon:gateway-mail',
		PUT: 'carbon:row-insert',
		DELETE: 'carbon:row-delete',
		PATCH: 'carbon:edit'
	};

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

	console.log(data.stats);
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
					<div class="flex-row">
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
				</div>
				<div class="w-full my-2 max-w-[500px] mx-auto aspect-square relative place-items-center align-middle place-content-center flex border-4 border-black ">
					<figure class="w-full h-full bg-no-repeat bg-center bg-[url('/one_fear.svg')]"></figure>
					<div class="w-full pl-9 absolute top-1/2 mx-auto left-0 right-0 text-center">
						<h1 class="upper text-lg font-extrabold ">BORN TO FETCH</h1>
						<h1 class="upper text-base font-extrabold">WORLD IS CORS</h1>
						<h1 class="upper text-sm font-extrabold">鬼神 Type Em All 1991</h1>
						<h1 class="upper text-sm font-extrabold">I am typesafe man</h1>
						<h1 class="pl-2 upper text-xs font-extrabold font">{(data.stats.GeneratedLinesOfCode/1000).toLocaleString()}k DEAD BUGS</h1>
					</div>
				</div>

				<div class="divider" />
				<h1 class="text-3xl font-black uppercase mb-2">Live Stats</h1>
				<div class="flex flex-col">
					<div class="stats shadow stats-vertical sm:stats-horizontal">
						<div class="stat">
							<div class="stat-figure text-primary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block w-8 h-8 stroke-current"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/></svg
								>
							</div>
							<div class="stat-title">Files Processsed</div>
							<div class="stat-value text-primary">{stats.ProcessedFiles}</div>
							<div class="stat-desc">Much process, such time saved</div>
						</div>

						<div class="stat">
							<div class="stat-figure text-secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block w-8 h-8 stroke-current"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/></svg
								>
							</div>
							<div class="stat-title">Codelines Generated</div>
							<div class="stat-value text-secondary">{stats.GeneratedLinesOfCode}</div>
							<div class="stat-desc">Code less, sleep more?</div>
						</div>
					</div>
					<div class="divider" />
					<h2 class="text-xl font-bold">Methods Processed</h2>
					<div class="stats shadow stats-vertical sm:stats-horizontal">
						{#each ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as method}
							<div class="stat">
								<div class="stat-figure text-primary rounded-sm">
									<Icon icon={icons[method]} class="h-5 w-5 {text_colors[method]}" />
								</div>
								<div class="stat-title">{method.toUpperCase()}</div>
								<div class="stat-value text-primary {text_colors[method]} ">{stats[method]}</div>
								<!-- <div class="stat-desc">Much process, such time saved</div> -->
							</div>
						{/each}
					</div>
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
