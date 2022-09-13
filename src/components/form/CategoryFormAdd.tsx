import { Button, Group, TextInput } from "@mantine/core"
import { useBoard } from "../../hooks/useBoard/UseBoard"

interface Props {
	handleClose: () => void
}

export default function CategoryFormAdd(props: Props) {
	const board = useBoard()

	const handleClick = () => {
		// TODO add category
		props.handleClose()
	}

	// TODO esto debería ser un form para usar el required
	return (
		<Group align="end" spacing="xs">
			<TextInput data-autofocus label="Name" required style={{ flex: 2, width: "100%" }} />
			<Button onClick={handleClick}>Create</Button>
		</Group>
	)
}
