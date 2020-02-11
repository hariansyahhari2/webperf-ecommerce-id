import fetch from 'node-fetch';
import { LHResponse } from './types';

export default async (name: string, url: string, device: string): Promise<LHResponse | null> => {
	const URL = `https://builder-dot-lighthouse-ci.appspot.com/ci`;

	try {
		// @ts-ignore
		const resp = await fetch(URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-API-KEY': process.env.LIGHTHOUSE_API_KEY,
			},
			body: JSON.stringify({
				output: 'json',
				url: url,
				emulatedFormFactor: device,
			})
		});

		const result = await resp.json();

		if (result) {
			const categories = result?.categories || null;
			const audits = result?.audits || null;
			const resourceItems = audits?.['resource-summary']?.details?.items || [];

			const response: LHResponse = {
				perf: categories?.performance?.score || 0,
				aiiy: categories?.accessibility?.score || 0,
				pwa: categories?.pwa?.score || 0,

				fcp: audits['first-contentful-paint']?.numericValue || 0,
				ttfb: audits['time-to-first-byte']?.numericValue || 0,
				tti: audits['interactive']?.numericValue || 0,
				si: audits['speed-index']?.numericValue || 0,

				reqCount: resourceItems?.[0]?.requestCount || 0,
				reqSize: resourceItems?.[0]?.size || 0,
				name,
				device,
			}

			console.log(`> Finish run job for ${url}: perf: ${response.perf}`);
			return response;
		}
	} catch (e) {
		console.error('> Error job', e);
	}

	return null;
}