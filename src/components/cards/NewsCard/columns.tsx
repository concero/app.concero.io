import { IconClock } from '@tabler/icons-react'
import { truncate, unixtimeFromNow } from '../../../utils/formatting'
import classNames from './NewsCard.module.pcss'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { action, category } from '../../../constants/tracking'
import { trackEvent } from '../../../hooks/useTracking'

export const columns = () => {
	return [
		{
			columnTitle: 'Title',
			cellComponent: item => <p className={classNames.newsTitle}>{truncate(item.title, 90)}</p>,
		},
		{
			columnTitle: 'When',
			cellComponent: item => (
				<div className={classNames.cellComponentContainer}>
					<div className="row ac gap-xs">
						<IconClock color={'var(--color-text-secondary)'} size={18} />
						<p className={classNames.truncate}>{unixtimeFromNow(item.published_on)}</p>
					</div>
				</div>
			),
		},
		{
			columnTitle: 'Link',
			cellComponent: item => (
				<div className="row ac gap-xs">
					<a
						href={item.url}
						target="_blank"
						rel="noreferrer"
						onClick={async () => {
							await trackEvent({
								category: category.NewsCard,
								action: action.ExternalLinkClicked,
								label: item.url,
							})
						}}
					>
						<p className={classNames.truncate}>{item.source_info.name}</p>
					</a>
				</div>
			),
		},
	]
}

// OLD (CRYPTOPANIC)
// export const columns = [
//   {
//     columnTitle: 'Title',
//     cellComponent: (item) => <p style={{ color: colors.grey.light }}>{truncate(item.title, 90)}</p>,
//   },
//   {
//     columnTitle: 'Sentiment',
//     cellComponent: (item) => {
//       return (
//         <div className={classNames.cellComponentContainer}>
//           <div className="row ac gap-xs">
//             <Icon name="Clock" color={colors.text.secondary} size={18} />
//             <p style={{ color: colors.text.secondary }}>{fromNow(item.created_at)}</p>
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     columnTitle: 'Sentiment',
//     cellComponent: (item) => (
//       <div className="row ac gap-xs">
//         <Icon name="Link" color={colors.text.secondary} size={18} />
//         <a href={item.url} target="_blank" rel="noreferrer">
//           <p style={{ color: colors.text.secondary }} className={classNames.truncate}>
//             {item.source.title}
//           </p>
//         </a>
//       </div>
//     ),
//   },
// ]

export const modalColumns = [
	{
		columnTitle: 'Symbol',
		cellComponent: item => <CryptoSymbol src={item.logoURI} symbol={truncate(item.symbol, 7)} />,
	},
	{
		columnTitle: 'Name',
		cellComponent: item => <p className="body1">{item.name ? truncate(item.name, 20) : ''}</p>,
	},
]
