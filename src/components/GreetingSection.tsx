import { useState } from 'react'
import { makeHelloActor } from '../helpers/actor'

export const GreetingSection = () => {
	const [name, setName] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [greetingMessage, setGreetingMessage] = useState<string | undefined>()

	const onChangeName = (e) => {
		const newName = e.target.value
		setName(newName)
	}

	const sayGreeting = async () => {
		const helloActor = makeHelloActor()
		const greeting = await helloActor.greet()

		setGreetingMessage(greeting)
	}

	const setGreeting = async () => {
		setLoading(true)

		const helloActor = makeHelloActor()
		await helloActor.set(name)

		setLoading(false)
	}

	return (
		<div className="grid w-fit grid-cols-2 place-items-center justify-items-center gap-10 p-10 text-lg">
			<div
				className="grid w-full items-center gap-10 rounded-lg border border-gray-800 p-10"
				onClick={sayGreeting}
			>
				<p className="text-xl font-semibold">Say greeting</p>
				<button className="bg-gray-800 px-4 py-2 text-white hover:bg-gray-600">
					QUERY
				</button>
				<div className="py-2 text-xl">{greetingMessage ?? 'Hello, !'}</div>
			</div>
			<div className="grid w-full items-center gap-10 rounded-lg border border-gray-800 p-10">
				<p className="text-xl font-semibold">Set greeting</p>
				<input
					className="border-2 border-gray-800 px-4 py-1"
					value={name}
					onChange={onChangeName}
				/>
				<button
					className="bg-gray-800 px-4 py-2 text-white hover:bg-gray-600 disabled:pointer-events-none disabled:opacity-50"
					onClick={setGreeting}
					disabled={loading}
				>
					CALL
				</button>
			</div>
		</div>
	)
}
