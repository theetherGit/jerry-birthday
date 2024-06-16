/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Create a unique cache name for this deployment
const CACHE = `cache-model-final-v1`;


self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE)
	);
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', async function(event) {
	const url = event.request.url;

	// Check if the request is for your model file from your own origin
	if (url.endsWith('.glb')) {
		try {
			const cachedResponse = await caches.match(event.request);
			if (cachedResponse) {
				return cachedResponse;
			}

			const networkResponse = await fetch(event.request);
			const cache = await caches.open(CACHE);
			await cache.put(event.request, networkResponse.clone());
			return networkResponse;
		} catch (error) {
			console.error('Error caching model:', error);
			return new Response('Failed to cache model');
		}
	}
	// Handle other requests (if applicable)
	return new Response('Not found');
});