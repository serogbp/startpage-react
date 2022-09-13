import { Button, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormEvent } from "react"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { Web } from "../../Types"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"

interface Props {
	name: string,
	handleClose: Function
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
			// TODO obtener array [nombre de webs] pasando el nombre de categoria
		}
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// TODO add category
		props.handleClose()
	}
	const handleDelete = () => {

	}

	return (
		<form onSubmit={formValues.onSubmit((values, event) => handleSubmit(event))}>
			<Stack spacing='xs'>
				<Group align="end" spacing="xs">
					<TextInput
						label="Name"
						type="text"
						required
						{...formValues.getInputProps('name')}
						data-autofocus
						style={{ width: "100%", flex: 2 }}
					/>
					<Button type="submit">Update</Button>
				</Group>

				<Group align="center" position="apart" mt="md">
					{/* <Stack>
						<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} text={"Delete column"} variant={"subtle"} />
						<Text color="dimmed" size="xs">The category will be deleted along with its webs</Text>
					</Stack> */}
					<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} text={"Delete"} variant={"subtle"} additionalToolTipText={"The category will be deleted along with its webs."} />
					<Text color="dimmed" size="xs">The category will be deleted along with its webs</Text>
				</Group>

			</Stack>
		</form>
	)
}
