import { Button, Tooltip } from "@mantine/core"
import { useEffect, useState } from "react"

interface Props {
	clicksRemaining: number,
	handleDelete: () => void
}

export const DeleteButtonTooltip = (props: Props) => {
	const [counter, setCounter] = useState(props.clicksRemaining)
	const label = `Click ${counter} ${counter === 1 ? 'more time' : 'times'} to confirm deletion`


	const handleClick = () => {
		setCounter(counter - 1)
	}

	const resetCounter = () => {
		setCounter(props.clicksRemaining)
	}

	useEffect(() => {
		if (counter <= 0) props.handleDelete()
	}, [counter])


	return (
		<Tooltip label={label} disabled={counter <=0} withArrow position="top" color="red">
			<Button onClick={handleClick} onMouseLeave={resetCounter} disabled={counter <=0} variant="subtle" color="red">Delete web</Button>
		</Tooltip>
	)
}
