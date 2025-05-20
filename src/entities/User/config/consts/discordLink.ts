const clientId = '1267215033025429595'
const redirectUri = 'https://app.concero.io/profile'

export const DISCORD_LINK_AUTH = `https://discord.com/oauth2/authorize?client_id= ${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
	redirectUri,
)}&scope=identify+guilds+email`
