import { Button, Group, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormEvent } from "react"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { Web } from "../../Types"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"

interface Props {
	name: string,
	handleClose: () => void
}

interface FormValues {
	name: string,
	webs: Web[]
}

export default function CategoryFormUpdate(props: Props) {
	const board = useBoard()

	const form = useForm<FormValues>({
		initialValues: {
			name: props.name,
			webs: [],
			// TODO obtener array [nombre de webs] pasando el nombre de categoría
		},
		validate: {
			name: (value) => (value !== props.name && board.category.isDuplicate(value) ? 'Category already exists' : null),
		}
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (props.name !== form.values.name)
			board.category.update(props.name, form.values.name)
		props.handleClose()
	}
	const handleDelete = () => {
		board.category.remove(props.name)
	}

	return (
		<form onSubmit={form.onSubmit((values, event) => handleSubmit(event))}>
			<Stack spacing='xs'>
					<TextInput
						label="Name"
						type="text"
						required
						{...form.getInputProps('name')}
						data-autofocus
						style={{ width: "100%", flex: 2 }}
					/>

				<Group align="center" position="apart" mt="md">
					<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} text={"Delete category and webs"} variant={"subtle"}/>
					<Button type="submit">Update</Button>
				</Group>
			</Stack>
		</form>
	)
}
