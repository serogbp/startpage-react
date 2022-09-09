import { Button, Group, TextInput } from "@mantine/core"
import { useBoard } from "../../hooks/UseBoard"

interface Props {
	handleClose: Function
}

export default function CategoryForm(props: Props) {
	const board = useBoard()

	const handleClick = () => {
		// TODO add category
		props.handleClose()
	}

	return (
		<Group align="center" spacing="xs">
			<TextInput data-autofocus placeholder="Category name..."  style={{ flex: 2, width: "100%" }} />
			<Button onClick={handleClick}>Save</Button>
		</Group>
	)
}
