import client from './clientProxy'

export async function get(req, on_ok = null, on_err = null) {
  try {
    const res = await client.get(req)
    if (on_ok) on_ok(res)
  } catch (error) {
    if (on_err) on_err(error.response)
  }
}

export async function post(req, on_ok = null, on_err = null) {
  try {
    const res = await client.post(req)
    if (on_ok) on_ok(res)
  } catch (error) {
    if (on_err) on_err(error.response)
  }
}

export async function apiRequestExec(req_fn) {
  // executes req_fn and returns { response, ok, err }
  let response = null
  let ok = false
  let err = null
  try {
    response = await req_fn()
    ok = true
  } catch (error) {
    err = error.response
  }
  return { response, ok, err }
}

export async function api(req_fn, on_ok = null, on_err = null) {
  // executes req_fn and calls on_ok or on_err depending on the result
  const { response, ok, err } = await apiRequestExec(req_fn)
  if (ok) {
    if (on_ok) on_ok(response)
  } else if (on_err) on_err(err)
}

export async function apiRequest(res) {
  // gets response, determines if it's ok, and returns { response, ok, err }
  let ok = false
  let err = null
  if (res.status >= 200 && res.status < 300) {
    ok = true
  } else {
    err = res
  }
  return { response: res, ok, err }
}
