const uploadFile = async (body, API_KEY) => {
  try {
    const request = await fetch('https://api.nakala.fr/datas/uploads', {
      headers: { 'X-API-KEY': API_KEY, Accept: 'application/json' },
      method: 'POST',
      body,
    })
    return await request.json()
  } catch (error) {
    console.error(error)
    throw new Error("Impossible d'uploader le fichier")
  }
}

const createData = async (body, API_KEY) => {
  try {
    const request = await fetch('https://api.nakala.fr/datas', {
      headers: { 'X-API-KEY': API_KEY, Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body,
    })
    return await request.json()
  } catch (error) {
    console.error(error)
    throw new Error('Impossible de créer la donnée')
  }
}

const download = async (dataId, fileId, API_KEY) => {
  try {
    const request = await fetch(`https://api.nakala.fr/data/${dataId}/${fileId}`, {
      headers: { 'X-API-KEY': API_KEY },
    })
    return await request.text()
  } catch (error) {
    console.error(error)
    throw new Error('Impossible de réccupérer le fichier')
  }
}

export const onRequestPost = async ({ request, env }) => {
  try {
    const { API_KEY } = env
    const formData = await request.formData()
    const fileInfo = await uploadFile(formData, API_KEY)
    const body = {
      status: 'pending',
      files: [fileInfo],
      metas: [
        {
          propertyUri: 'http://nakala.fr/terms#title',
          value: 'Ma première partition',
          typeUri: 'http://www.w3.org/2001/XMLSchema#string',
          lang: 'fr',
        },
        {
          propertyUri: 'http://nakala.fr/terms#type',
          value: 'http://purl.org/coar/resource_type/c_18cw',
          typeUri: 'http://www.w3.org/2001/XMLSchema#anyURI',
        },
        {
          propertyUri: 'http://nakala.fr/terms#creator',
          value: {
            givenname: 'Félix',
            surname: 'Poullet-Pagès',
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
      ],
    }
    const dataInfo = await createData(JSON.stringify(body), API_KEY)
    const file = await download(dataInfo.payload.id, fileInfo.sha1, API_KEY)
    return new Response(file, { status: 201, headers: { 'Access-Control-Allow-Origin': '*' } })
  } catch (error) {
    return new Response(error, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
