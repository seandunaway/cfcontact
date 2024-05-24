export default {
	async fetch(req, env) {
		if (!env.email) throw new Error('env.email')

		let url = new URL(req.url)
		if (url.pathname != '/') return new Response(undefined, {status: 404})
		if (req.method.toLowerCase() != 'post') return new Response(undefined, {status: 400})

		let form = await req.formData()
		let content = ''
		for (let [key, value] of form) {
			content += `${key}: ${value}\n`
		}
		console.info(content)

		let mc = await fetch('https://api.mailchannels.net/tx/v1/send', {
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				from: {email: env.email},
				personalizations: [{to: [{email: env.email}]}],
				subject: 'contact',
				content: [{type: 'text/plain', value: content}],
			}),
		})
		if (!mc.ok) return new Response(await mc.text(), {status: mc.status, headers: mc.headers})

		let referer = req.headers.get('referer')
		if (referer) return Response.redirect(referer, 303)

		return new Response(undefined, {status: 201})
	}
}
