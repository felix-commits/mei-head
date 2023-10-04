export const onRequestPost = async context => {
  const body = await context.request.formData()

  const request = await fetch('https://api.nakala.fr/datas/uploads', {
    headers: { 'X-API-KEY': context.env.API_KEY, Accept: 'application/json' },
    method: 'POST',
    body,
  })

  const response = await request.json()

  const content = {
    status: 'pending',
    files: [response],
    metas: [
      {
        propertyUri: 'http://nakala.fr/terms#title',
        value: 'Ma première partition',
        typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        lang: 'fr',
      },
      {
        propertyUri: 'http://nakala.fr/terms#type',
        value: 'http://purl.org/coar/resource_type/c_c513',
        typeUri: 'http://www.w3.org/2001/XMLSchema#anyURI',
      },
      {
        propertyUri: 'http://nakala.fr/terms#creator',
        value: {
          givenname: 'Jean',
          surname: 'Dupont',
        },
      },
      {
        propertyUri: 'http://nakala.fr/terms#created',
        value: '2020-01-01',
        typeUri: 'http://www.w3.org/2001/XMLSchema#string',
      },
      {
        propertyUri: 'http://nakala.fr/terms#license',
        value: 'CC-BY-4.0',
        typeUri: 'http://www.w3.org/2001/XMLSchema#string',
      },
      {
        propertyUri: 'http://purl.org/dc/terms/subject',
        value: 'verovio',
        typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        lang: 'fr',
      },
      {
        propertyUri: 'http://purl.org/dc/terms/subject',
        value: 'Une photo de chouette très chouette',
        typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        lang: 'fr',
      },
    ],
  }

  const requestData = await fetch('https://api.nakala.fr/datas', {
    headers: { 'X-API-KEY': context.env.API_KEY, Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(content),
  })

  const responseData = await requestData.json()

  const getInfo = await fetch(`https://api.nakala.fr/data/${responseData.payload.id}/${response.sha1}`, {
    headers: { 'X-API-KEY': context.env.API_KEY },
  })

  const finals = await getInfo.text()

  return new Response({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
}
