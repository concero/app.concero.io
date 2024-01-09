export enum category {
	API = 'cat_api',
	Header = 'cat_header',
	StakingScreen = 'cat_staking_screen',
	StakingHeader = 'cat_staking_header',
	NewsCard = 'cat_news_card',
	SwapCard = 'cat_swap_card',
	ChartCard = 'cat_chart_card',
	ChainsMenu = 'cat_chains_menu',
	MainMenu = 'cat_main_menu',
	Menu = 'cat_menu',
	FeatureCard = 'cat_feature_card',
	Navigation = 'cat_navigation',
	LanguageMenu = 'cat_language_menu',
	SubMenu = 'cat_submenu',
	ThemeMenu = 'cat_theme_menu',
	ThemeSwitch = 'cat_theme_switch',
	Wallet = 'cat_wallet',
	WalletMenu = 'cat_wallet_menu',
	WalletSelectMenu = 'cat_wallet_select_menu',
	WelcomeScreen = 'cat_welcome_screen',
	Widget = 'cat_widget',
	WidgetEvent = 'cat_widget_event',
}
export enum param {
	FeatureCardTitle = 'param_feature_card_title',
	FeatureCardId = 'param_feature_card_id',
	Tab = 'param_tab',
	PrevMenu = 'param_prev_menu',
	ChainId = 'param_chain_id',
	ChainName = 'param_chain_name',
	ChainIdAdded = 'param_chain_added',
	Menu = 'param_menu',
	StatsModal = 'param_stats_modal',
	WelcomeMessageLink = 'param_welcome_message_link',
	SwitchedChain = 'param_switched_chain',
	SwitchedTheme = 'param_switched_theme',
	SwitchedLanguage = 'param_switched_language',
	AddedTokenAddress = 'param_added_token_address',
	AddedTokenName = 'param_added_token_name',
	Wallet = 'param_wallet',

	// Transaction:
	RouteId = 'param_route_id',
	FromToken = 'param_from_token',
	FromChainId = 'param_from_chain_id',
	ToToken = 'param_to_token',
	Timestamp = 'param_timestamp',
	Status = 'param_status',
	Error = 'param_error',
	Message = 'param_message',
	GasCostUSD = 'param_gas_cost_usd',
	TxHash = 'param_tx_hash',
	TxLink = 'param_tx_link',
	ToChainId = 'param_to_chain_id',
	FromAmount = 'param_from_amount',
	ToAmount = 'param_to_amount',
	ToAmountUSD = 'param_to_amount_usd',
	ToAmountMin = 'param_to_amount_min',
	FromAmountUSD = 'param_from_amount_usd',
	Variant = 'param_variant',
	Type = 'param_type',
	ErrorCode = 'param_error_code',
	ErrorMessage = 'param_error_message',
	InsuranceState = 'param_insurance_state',
	InsuranceFeeAmountUSD = 'param_insurance_fee_amount_usd',
	ValueLoss = 'param_value_loss',
}
export enum action {
	// API
	APIError = 'action_api_error',
	SubmitTxError = 'action_submit_tx_error',

	// Header
	ToggleTheme = 'action_toggle_theme',
	ToggleFeedbackModalVisible = 'action_toggle_feedback_modal_visible',
	FeedbackSubmitSuccess = 'action_feedback_submit_success',
	FeedbackSubmitError = 'action_feedback_submit_error',

	// Wallet
	ClickConnectWallet = 'action_click_connect_wallet',
	ConnectWalletSuccess = 'action_connect_wallet_success',
	ConnectWalletFailed = 'action_connect_wallet_failed',
	WalletClientNotFound = 'action_wallet_client_not_found',
	CopyAddressToClipboard = 'action_copy_addr_to_clipboard',
	DisconnectWallet = 'action_disconnect_wallet',
	OpenBlockchainExplorer = 'action_open_blockchain_explorer',

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
	// Widget
	AddChain = 'action_add_chain',
	AddToken = 'action_add_token',

	// Widget
	OnRouteExecutionCompleted = 'action_on_route_exec_completed',
	OnRouteExecutionFailed = 'action_on_route_exec_failed',
	OnRouteExecutionUpdated = 'action_on_route_exec_updated',
	OnRouteHighValueLoss = 'action_on_route_high_value_loss',

	// Welcome_Screen
	OpenWelcomeMessageScreen = 'action_open_welcome_screen',
	CloseWelcomeScreen = 'action_close_welcome_screen',
	OpenStatsModal = 'action_open_stats_modal',
	OpenWelcomeMessageLink = 'action_open_welcome_message_link',

	// Feature Card
	ClickLearnMore = 'action_click_cta',
	CloseFeatureCard = 'action_close_feature_card',
	DisplayFeatureCard = 'action_display_feature_card',

	// Menu
	OpenMenu = 'action_open_submenu',
	PageLoad = 'action_pageload',
	SwitchLanguage = 'action_switch_language',
	SwitchTab = 'action_switch_tab',
	SwitchTheme = 'action_switch_theme',
	DownloadBrandAssets = 'action_dl_brand_assets',
}
export enum label {}
