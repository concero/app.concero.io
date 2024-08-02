import axios from 'axios'
import OAuth from 'oauth-1.0a'
import CryptoJS from 'crypto-js'
import { updateUser } from '../user/updateUser'
import { type IUser } from '../userType'

const oauth = OAuth({
	consumer: { key: process.env.TWITTER_API_KEY, secret: process.env.TWITTER_API_SECRET_KEY },
	signature_method: 'HMAC-SHA1',
	hash_function(base_string, key) {
		return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
	},
})

export const getRequestToken = async () => {
	const request_data = {
		url: 'https://api.twitter.com/oauth/request_token',
		method: 'POST',
		data: { oauth_callback: process.env.TWITTER_CALLBACK_URL },
	}

	const headers = oauth.toHeader(oauth.authorize(request_data))

	try {
		const response = await axios.post(request_data.url, null, { headers })
		const params = new URLSearchParams(response.data)
		const oauthToken = params.get('oauth_token')
		window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
	} catch (error) {
		console.error('Error getting request token:', error)
	}
}

const getAccessTokens = async (oauthToken: string, oauthVerifier: string) => {
	const request_data = {
		url: 'https://api.twitter.com/oauth/access_token',
		method: 'POST',
		data: { oauth_token: oauthToken, oauth_verifier: oauthVerifier },
	}

	const token = {
		key: oauthToken,
		secret: '',
	}

	const headers = oauth.toHeader(oauth.authorize(request_data, token))

	try {
		const response = await axios.post(request_data.url, null, { headers })
		const params = new URLSearchParams(response.data)
		const accessToken = params.get('oauth_token')
		const accessTokenSecret = params.get('oauth_token_secret')

		console.log('Access Token:', accessToken)
		console.log('Access Token Secret:', accessTokenSecret)

		return { accessToken, accessTokenSecret }
	} catch (error) {
		console.log('Error getting access token:', error)

		return { accessToken: '', accessTokenSecret: '' }
	}
}

const getUserInfo = async (accessToken: string, accessTokenSecret: string) => {
	const request_data = {
		url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
		method: 'GET',
	}

	const token = {
		key: accessToken,
		secret: accessTokenSecret,
	}

	const headers = oauth.toHeader(oauth.authorize(request_data, token))

	try {
		const response = await axios.get(request_data.url, { headers })
		return response.data
	} catch (error) {
		console.error('Error getting user info', error)
	}
}

export const connectTwitter = async (oauthToken: string, oauthVerifier: string, user: IUser) => {
	const { accessToken, accessTokenSecret } = await getAccessTokens(oauthToken, oauthVerifier)

	if (accessToken && accessTokenSecret) {
		const userInfo = await getUserInfo(accessToken, accessTokenSecret)
		console.log(userInfo)

		return ''
		// const { id, username, email, avatar, locale } = userInfo.data
		//
		// await updateUser(user._id, {
		// 	points: user.points + 5,
		// 	subscriptions: {
		// 		twitter: {
		// 			id,
		// 			avatar,
		// 			username,
		// 			email,
		// 			locale,
		// 		},
		// 		discord: user?.subscriptions?.discord || null,
		// 	},
		// })
		//
		// return username
	}
}
