/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Create a unique cache name for this deployment
const CACHE = `cache-model-final-v1`;

const models = [
	'/models/birthday-set-final.glb'
]

self.addEventListener('install', function(event) {

	async function addCache() {
		console.log('attached');
		const cache = await caches.open(CACHE);
		await cache.addAll(models)
	}

	event.waitUntil(
		addCache()
	);
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			console.log(key);
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', async function(event) {
	const url = event.request.url;
	// Check if the request is for your model file from your own origin
	if (url.endsWith('.glb')) {
		console.log(url);
		try {
			const cache = await caches.open(CACHE);

			const cachedResponse = await cache.match(event.request);
			console.log(cachedResponse);
			if (cachedResponse) {
				console.log('hj');
				return cachedResponse;
			}
			console.log('aya');
			await cache.add(event.request);
			return cache.match(event.request);
		} catch (error) {
			console.error('Error caching model:', error);
			return new Response('Failed to cache model');
		}
	}
	// Handle other requests (if applicable)
	return new Response('Not found');
});