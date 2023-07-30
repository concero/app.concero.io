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
