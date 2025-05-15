// export const DISCORD_LINK_AUTH = `https://discord.com/oauth2/authorize?client_id=1267215033025429595&response_type=code&redirect_uri=https%3A%2F%2Fapp.concero.io%2Fprofile&scope=identify+guilds+email`

const clientId = '1267215033025429595'
const redirectUri = 'https://app.concero.io/profile'

export const DISCORD_LINK_AUTH = `https://discord.com/oauth2/authorize?client_id= ${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
	redirectUri,
)}&scope=identify%20guilds%20email`
