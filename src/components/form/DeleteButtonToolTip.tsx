import { Button, ButtonVariant, Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

interface Props {
	clicksRemaining: number,
	handleDelete: () => void,
	text: string,
	variant: string
}

export const DeleteButtonTooltip = (props: Props) => {
	const [counter, setCounter] = useState(props.clicksRemaining)
	const label = `Click ${counter} ${counter === 1 ? 'more time' : 'times'} to confirm`


	const handleClick = () => {
		setCounter(counter - 1)
	}

	const resetCounter = () => {
		if (counter > 0) setCounter(props.clicksRemaining)
	}

	useEffect(() => {
		if (counter <= 0) props.handleDelete()
	}, [counter])


	return (
		<Tooltip label={label} disabled={counter <=0} withArrow position="top" color="red">
			<Button onClick={handleClick} onMouseLeave={resetCounter} disabled={counter <=0} variant={props.variant as ButtonVariant} color="red">{props.text}</Button>
		</Tooltip>
	)
}
