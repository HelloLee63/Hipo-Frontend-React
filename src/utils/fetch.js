import { useCallback, useEffect, useRef, useState } from "react"
import QueryString from 'query-string' 

export async function processResponse(response) {
  if (!response.ok) {
    throw await response.json()
  }

  return response.json()
}

export async function  executeFetch (query) {
  try {
    const response = await fetch(String(query))
    if (!response.ok) {
      throw await response.json()
    }

    return await response.json()
  } catch (e) {
    return Promise.reject(e)
  }
}

export function  useFetch(query, options) {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState()

  const optionsRef = useRef(options)
  optionsRef.current = options

  const strQuery = String(query)

  const fetchData = useCallback(
    async (query) => {
      if (!query) {
        return
      }

      setLoading(true)

      try {
        const data = await executeFetch(query)

        setData((optionsRef.current?.transform ?? (v => v))(data))
        setLoaded(true)
      } catch (e) {
        setError(e)
        setData(undefined)
      }

      setLoading(false)
    },
    [],
  )

  const load =useCallback(
    (query = strQuery) => {
      setLoaded(false)
      return fetchData(String(query))
    },
    [strQuery]
  )

  const reset = useCallback(() => {
    setLoading(false);
    setLoaded(false);
    setData(undefined);
    setError(undefined);
  }, []);

  useEffect(() => {
    if (optionsRef.current?.lazy !== true) {
      fetchData(strQuery).catch(Error)
    }
    
  }, [strQuery])

  return {
    loading,
    loaded,
    data,
    error,
    load,
    reset,
  }
}

export function  queryfy(obj) {
  return QueryString.stringfy(obj, {
    skipEmptyString: true,
    skipNull: true,
    arrayFormat: 'comma',
    encode: true
  })  
}