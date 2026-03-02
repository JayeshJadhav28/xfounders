export async function fetchJson<T = any>(input: RequestInfo | URL, init?: RequestInit): Promise<{ data: T; res: Response }> {
  const res = await fetch(input as any, init)

  // Try to detect JSON safely
  const contentType = res.headers.get("content-type") || ""

  // Always read body once; decide how to parse
  const bodyText = await res.text()

  let data: any = null
  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(bodyText)
    } catch (err) {
      // Malformed JSON
      throw new Error(`Invalid JSON from server (${res.status}): ${String(err)}`)
    }
  } else {
    // Not JSON (likely HTML error page or redirect response)
    const snippet = bodyText.slice(0, 200).replace(/\s+/g, " ")
    throw new Error(
      `Expected JSON but got '${contentType || "unknown"}' (status ${res.status}). Body starts with: ${snippet}`
    )
  }

  if (!res.ok) {
    // Surface API-provided error when available
    const message = (data && (data.error || data.message)) || `Request failed with status ${res.status}`
    throw new Error(String(message))
  }

  return { data: data as T, res }
}
