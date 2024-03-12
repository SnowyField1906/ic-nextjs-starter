/* eslint-disable @next/next/no-img-element */
// Next, React
import { GreetingSection } from '../components/GreetingSection'

function HomePage() {
	return (
		<div className="">
			<main className="grid h-screen w-screen place-items-center">
				<GreetingSection />
			</main>
		</div>
	)
}

export default HomePage
