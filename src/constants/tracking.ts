export enum category {
	Header = 'cat_header',
	StakingScreen = 'cat_staking_screen',
	StakingHeader = 'cat_staking_header',
	NewsCard = 'cat_news_card',
	PoolCard = 'cat_pool_card',
	PoolUserActions = 'cat_user_actions',
	QuestCard = 'cat_quest_card',
	ChartCard = 'cat_chart_card',
	Wallet = 'cat_wallet',
}
export enum param {
	// Transaction:
	Status = 'param_status',
	Error = 'param_error',
}
export enum action {
	// API
	APIError = 'action_api_error',
	SubmitTxError = 'action_submit_tx_error',

	// Header
	ToggleTheme = 'action_toggle_theme',
	ToggleFeedbackModalVisible = 'action_toggle_feedback_modal_visible',

	// Wallet
	ClickConnectWallet = 'action_click_connect_wallet',
	WalletClientNotFound = 'action_wallet_client_not_found',
	CopyAddressToClipboard = 'action_copy_addr_to_clipboard',
	DisconnectWallet = 'action_disconnect_wallet',

	// SwapCard
	ToggleRouteCard = 'action_toggle_route_card',
	ToggleInsurance = 'action_toggle_insurance',
	InsufficientGas = 'action_insufficient_gas',
	OpenRoutesModal = 'action_open_routes_modal',
	SelectRoute = 'action_select_route',
	ToggleSettingsModal = 'action_toggle_settings_modal',
	FetchLifiRoutesError = 'action_fetch_lifi_routes_error',
	FetchRangoRoutesError = 'action_fetch_rango_routes_error',
	BeginSwap = 'action_begin_swap',

	// Pool deposit
	BeginDeposit = 'action_begin_deposit',
	SuccessDeposit = 'action_success_deposit',
	FailedDeposit = 'action_failed_deposit',

	// Pool withdrawal
	BeginWithdrawalRequest = 'action_begin_withdrawal_request',
	SuccessWithdrawalRequest = 'action_success_withdrawal_request',
	FailedWithdrawalRequest = 'action_failed_withdrawal_request',

	BeginWithdrawalComplete = 'action_begin_withdrawal_complete',
	SuccessWithdrawalComplete = 'action_success_withdrawal_complete',
	FailedWithdrawalComplete = 'action_failed_withdrawal_complete',

	BeginRetryWithdrawalRequest = 'action_begin_deposit_request',
	SuccessRetryWithdrawalRequest = 'action_success_deposit_request',
	FailedRetryWithdrawalRequest = 'action_failed_deposit_request',

	BeginQuest = 'action_begin_quest',
	BeginVerifyQuest = 'action_begin_verify_quest',
	SuccessQuest = 'action_success_quest',
	FailedQuest = 'action_failed_quest',
	ClaimQuest = 'action_claim_quest',
	SwapFailed = 'action_swap_failed',
	SwapSuccess = 'action_swap_success',
	SwapRejected = 'action_swap_rejected',

	// Chart
	ToggleChartModalVisible = 'action_toggle_chart_modal_visible',
	ToggleChart = 'action_toggle_chart',
	SetChartInterval = 'action_set_chart_interval',

	// General
	SelectToken = 'action_select_token',
	ScrollToEnd = 'action_scroll_to_end',
	Click = 'action_click',
	ExternalLinkClicked = 'action_external_link_clicked',

	// Staking
	FilterTagClicked = 'action_filter_tag_clicked',
	ProtocolModalOpened = 'action_protocol_modal_opened',
}
export enum label {}
