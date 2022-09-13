import { Button, Group, Stack, Text, TextInput } from "@mantine/core"
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

	const formValues = useForm<FormValues>({
		initialValues: {
			name: props.name,
			webs: [],
			// TODO obtener array [nombre de webs] pasando el nombre de categoría
		}
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// TODO add category
		props.handleClose()
	}
	const handleDelete = () => {
		// TODO remove category
	}

	return (
		<form onSubmit={formValues.onSubmit((values, event) => handleSubmit(event))}>
			<Stack spacing='xs'>
					<TextInput
						label="Name"
						type="text"
						required
						{...formValues.getInputProps('name')}
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
