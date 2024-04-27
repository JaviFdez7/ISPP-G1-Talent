import React from 'react'
import mainBackground from '../../images/main-background2.jpg'
import PricingTable from '../../components/subscription/PricingTable'

export default function RepresentativeSubscription() {
	const suscriptions = [
		{
			name: 'Basic plan',
			price: '49.95€',
			description: ['25 searches', '3 members per search', 'Basic filters'],
		},
		{
			name: 'Pro plan',
			price: '99.95€',
			description: [
				'150 searches',
				'5 members per search',
				'All filters',
				'Profile statistics',
				'Shorter response time',
			],
		},
		{
			name: 'Custom',
			price: 'Custom',
			description: ['Custom', 'Custom', 'Custom', 'Custom', 'Custom'],
		},
	]
	return (
		<div
			className='flex flex-col items-center justify-center bg-fixed h-screen w-screen'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className='container px-16 py-24 mx-auto'>
				<div className='flex flex-wrap -m-4'>
					{suscriptions.map((suscription, index) => (
						<PricingTable suscription={suscription} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}
