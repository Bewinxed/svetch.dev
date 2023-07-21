import { MONGODB_DATA_API_KEY, TELEMETRY_ENDPOINT } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type Telemetry = {
	_id: string;
	project: string;
	timestamp: number;
	data: {
		session_id: string; // Unique identifier for the user's session (optional, if the script is used publicly)

		// Script information
		script_name: string; // The name of the code generator script
		script_version?: string; // The version of the code generator script

		// User environment
		operating_system: string; // The user's operating system (e.g., Windows, macOS, Linux)
		node_version: string; // The version of Node.js the user is using
		npm_version: string; // The version of npm the user is using

		// Code generation details
		processed_files_count: number; // The number of files generated by the script
		generated_lines_of_code: number; // The total number of lines of code generated
		processed_endpoints: Record<string, number>;

		// Error tracking (if applicable)
		encountered_errors: boolean; // Whether any errors were encountered during code generation
		error_messages: string[]; // An array of error messages, if errors occurred

		// Custom events and properties (add more as needed)
		custom_events?: {
			event_name: string;
			event_properties?: Record<string, any>; // Additional properties specific to the custom event
		}[];
	};
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const payload = (await request.json()) as Telemetry;

		// validate
		if (!payload.project || !payload.timestamp || !payload.data) {
			return json({ error: 'Invalid payload' }, { status: 400 });
		}

		const data = JSON.stringify({
			collection: 'telemetry',
			database: 'svetch',
			dataSource: 'Clussy',
			document: payload
		});

		const inserted_id = await fetch(`${TELEMETRY_ENDPOINT}/action/insertOne`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/ejson',
					'Access-Control-Request-Headers': '*',
					'api-key': MONGODB_DATA_API_KEY
				},
				body: data
			})
			.then((res) => res.json())
			.catch((err) => {
				throw error(500, err);
			});

		console.log(inserted_id);

		return json(inserted_id);
	} catch (err) {
		throw error(500, err);
	}
};
