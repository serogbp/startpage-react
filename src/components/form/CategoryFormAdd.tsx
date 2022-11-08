import { Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormEvent } from "react"
import { useBoard } from "../../hooks/useBoard/UseBoard"

interface Props {
	handleClose: () => void
}

interface FormValues {
	name: string
}

export default function CategoryFormAdd(props: Props) {
	const board = useBoard()

	const form = useForm<FormValues>({
		initialValues: {
			name: ""
		},
		validate: {
			name: (value) => (board.category.isDuplicate(value) ? 'Category already exists' : null),
		}
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		board.category.add(form.values.name)
		props.handleClose()
	}

	return (
		<form onSubmit={form.onSubmit((values, event) => handleSubmit(event))}>
			<Group align="end" spacing="xs">
			<TextInput
						label="Name"
						type="text"
						required
						{...form.getInputProps('name')}
						data-autofocus
						style={{ width: "100%", flex: 2 }}
					/>
				<Button type="submit">Create</Button>
			</Group>
		</form>
	)
}
