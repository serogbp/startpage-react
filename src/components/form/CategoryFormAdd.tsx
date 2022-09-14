import { Button, Group, TextInput } from "@mantine/core"
import { useState } from "react"
import { useBoard } from "../../hooks/useBoard/UseBoard"

interface Props {
	handleClose: () => void
}

export default function CategoryFormAdd(props: Props) {
	const board = useBoard()
	const [name, setName] = useState("")

	const handleClick = () => {
		board.category.add(name)
		props.handleClose()
	}

	// TODO esto debería ser un form para usar el required
	return (
		<Group align="end" spacing="xs">
			<TextInput value={name} onChange={(event) =>  setName(event.currentTarget.value) } data-autofocus label="Name" required style={{ flex: 2, width: "100%" }} />
			<Button onClick={handleClick}>Create</Button>
		</Group>
	)
}
