import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({params, fetch}) => {
	try {
		const response = await fetch(`https://cdn.theether.in/${params.modelName}`)
		if (response && response.ok) {
			return new Response(response.body, {
				headers: new Headers({
					'Cache-control': `max-age=${60*60*24*30}, public`
				})
			})
		}
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify({message: 'CDN not working'}), {
			status: 500,
			statusText: 'Server Error'
		})
	}
}