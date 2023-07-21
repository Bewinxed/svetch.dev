import type { AggregatedTelemetry } from 'src/types/telemetry';
import type { PageServerLoad } from './$types';
import type { Telemetry } from './telemetry/+server';

export const load: PageServerLoad = async ({ request, fetch }) => {
	const {documents} = await fetch('/telemetry').then(async (res) => await res.json() as {documents: AggregatedTelemetry[]}).catch((err) => {
		return {documents: []}});

	return {
		stats: documents[0]
	};
};
