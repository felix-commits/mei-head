const uploadFile = async (body, env) => {
  try {
    const request = await fetch('https://api.nakala.fr/datas/uploads', {
      headers: { 'X-API-KEY': env.API_KEY, Accept: 'application/json' },
      method: 'POST',
      body,
    })
    return await request.json()
  } catch (error) {
    throw error
  }
}

const createData = async (body, env) => {
  try {
    const request = await fetch('https://api.nakala.fr/datas', {
      headers: { 'X-API-KEY': env.API_KEY, Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body,
    })
    return await request.json()
  } catch (error) {
    throw error
  }
}

// const download = async (dataId, fileId, API_KEY) => {
//   try {
//     const request = await fetch(`https://api.nakala.fr/data/${dataId}/${fileId}`, {
//       headers: { 'X-API-KEY': API_KEY },
//     })
//     return await request.text()
//   } catch (error) {
//     console.error(error)
//     throw new Error('Impossible de réccupérer le fichier')
//   }
// }

const addDataToCollection = async (dataId, env) => {
  try {
    const request = await fetch(`https://api.nakala.fr/collections/${env.SCORE_COLLECTION}/datas`, {
      headers: { 'X-API-KEY': env.API_KEY },
      method: 'POST',
      body: JSON.stringify([dataId]),
    })
    return await request.json()
  } catch (error) {
    throw error
  }
}

export const onRequestPost = async ({ request, env }) => {
  try {
    const formData = await request.formData()
    const fileInfo = await uploadFile(formData, env)
    const body = {
      status: 'pending',
      files: [fileInfo],
      metas: [
        {
          propertyUri: 'http://nakala.fr/terms#title',
          value: formData.get('workLabel'),
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
            orcid: '0000-0003-0740-7527',
          },
        },
        {
          propertyUri: 'http://nakala.fr/terms#created',
          value: new Date().toISOString().substring(0, 10),
          typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        },
        {
          propertyUri: 'http://nakala.fr/terms#license',
          value: 'CC-BY-4.0',
          typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        },
        {
          propertyUri: 'http://purl.org/dc/terms/contributor',
          value: formData.get('composer'),
          typeUri: 'http://www.w3.org/2001/XMLSchema#anyURI',
        },
        {
          propertyUri: 'http://purl.org/dc/terms/isVersionOf',
          value: formData.get('work'),
          typeUri: 'http://www.w3.org/2001/XMLSchema#anyURI',
        },
        {
          propertyUri: 'http://purl.org/dc/terms/creator',
          value: formData.get('composerLabel'),
          typeUri: 'http://www.w3.org/2001/XMLSchema#string',
        },
      ],
    }
    const dataInfo = await createData(JSON.stringify(body), env)
    const collectionInfo = await addDataToCollection(dataInfo.payload.id, env)
    return new Response(JSON.stringify({ fileInfo, dataInfo, collectionInfo }), {
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(error, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
