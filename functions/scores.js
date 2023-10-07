export const onRequestGet = async ({ env }) => {
  try {
    const request = await fetch(`https://api.nakala.fr/collections/${env.SCORE_COLLECTION}/datas`, {
      headers: { 'X-API-KEY': env.API_KEY, Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    return new Response(JSON.stringify(await request.json()), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(error, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
