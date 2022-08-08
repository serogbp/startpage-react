import { Button, FocusTrap, Group, MultiSelect, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { memo, useEffect, useState } from "react"
import { UseWebs } from "../../hooks/UseWebs"
import { Web, WebFormMode } from "../../Types"
import { getDomain, urlRegex } from "../../utils/utils"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"

interface Props {
	setOpened: Function,
	web?: Web,
	category: string,
	mode: WebFormMode,
}

interface FormValues {
	id: string,
	name: string,
	category: string,
	tags: string[]
}


const WebForm = memo((props: Props) => {
	const webHook = UseWebs()
	const [mode, setMode] = useState(props.mode)
	const { web } = props
	let duplicateWeb: Web
	const theme = useMantineTheme()

	const categoryData = webHook.getWebs().categoryOrder
	const tagsData = webHook.getUniqueTags()

	// Al pulsar en el boton, pasas a modificar en el formulario la web duplicada
	const duplicateMessage = (duplicateWeb: Web, category: string) => {
		return (
			<>
				<Text>
					Already exists in the category {category}.
				</Text>
				<UnstyledButton
					onClick={(event: any) => {
						event.preventDefault()
						setMode(WebFormMode.update)
						// setWeb(duplicateWeb)
					}}
					style={{
						color: theme.colors.blue[5],
						textDecoration: 'underline'
					}}>
					Do you want to modify it instead?
				</UnstyledButton>
			</>
		)
	}





	const closeForm = () => {
		// if (Object.entries(formValues.errors).length === 0) props.setOpened(false)
	}


	const handleAdd = (): void => {
		// const newWeb = {
		// 	url: formValues.values.id,
		// 	name: formValues.values.name,
		// 	category: formValues.values.category,
		// 	tags: formValues.values.tags,
		// 	image: '',
		// 	stats: { timesClicked: 0 },
		// 	index: 0
		// }

		try {
			console.log("add")
			//TODO
			// context.handlers.addWeb(newWeb)
		} catch (error) {

		}
		finally {
			closeForm()
		}
	}


	const handleUpdate = (): void => {
		if (!web) return
		// const updatedWeb = {
		// 	id: formValues.values.id,
		// 	name: formValues.values.name,
		// 	category: formValues.values.category,
		// 	tags: formValues.values.tags,
		// }
		try {
			console.log("update")
			//TODO
			// context.handlers.updateWeb(updatedWeb, web.id)
		} catch (error) {
		}
		finally {
			closeForm()
		}
	}


	const handleDelete = (): void => {
		if (!web) return
		try {
			//TODO
			// context.handlers.deleteWeb(web.id)
		} catch (error) {
		}
		finally {
			closeForm()
		}
	}

	return (
		<FormBody
			categoryData={categoryData}
			tagsData={tagsData}
			mode={mode}
			handleAdd={handleAdd}
			handleUpdate={handleUpdate}
			handleDelete={handleDelete}
		/>
	)
})


export default WebForm


interface FormProps {
	categoryData: string[],
	tagsData: string[],
	mode: WebFormMode,
	handleAdd: () => void,
	handleUpdate: () => void,
	handleDelete: () => void,

}


const FormBody = memo((props: FormProps) => {
	const [categoryData, setCategoryData] = useState<string[]>(props.categoryData)
	const [tagsData, setTagsData] = useState<string[]>(props.tagsData)
	const { mode, handleAdd, handleUpdate, handleDelete } = props

	const formValues = useForm<FormValues>({
		initialValues: {
			id: "",
			name: "",
			// TODO autocompletar si la categoria de props no es nula
			category: "",
			tags: []
		},

	})

	const onBlurInputUrl = () => {
		formValues.validateField('url')
		autoCompleteInputName()
	}
	const autoCompleteInputName = () => {
		const { id, name } = formValues.values
		if (urlRegex.test(id) && name === '') {
			formValues.setFieldValue('name', getDomain(id))
		}
	}

	return (
		<form>
			<Stack spacing='xs'>
				<FocusTrap active={true}>
					<TextInput
						type="url"
						autoFocus
						// TODO: Autofocus hace focus y despues se quita
						required
						label="Url"
						placeholder="https://www.example.com"
						{...formValues.getInputProps('id')}
						onBlur={() => onBlurInputUrl()}
						data-autofocus
					/>

				<TextInput
					required
					label="Name"
					placeholder="Example"
					{...formValues.getInputProps('name')}
				/>
				<Select
					label="Category"
					placeholder="Pick one"
					data={props.categoryData}
					{...formValues.getInputProps('category')}
					required
					searchable
					getCreateLabel={(query) => `Create ${query}`}
					onCreate={(query) => setCategoryData([...categoryData, query])}
				/>
				<MultiSelect
					label="Tags"
					placeholder="Pick all tags you like"
					data={props.tagsData}
					{...formValues.getInputProps('tags')}
					searchable
					clearable
					getCreateLabel={(query) => `Create ${query}`}
					onCreate={(query) => setTagsData([...props.tagsData, query])}
				/>

				<Group position="apart" mt='md' hidden={mode !== WebFormMode.update}>
					<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} />
					<Button onClick={() => { handleUpdate() }}>Update web</Button>
					{/* TODO: Usar en version movil */}
					{/* <DeleteButtonModal web={web} handleDelete={handleDelete} setOpened={props.setOpened}/> */}
				</Group>

				<Group position="apart" mt='md' hidden={mode !== WebFormMode.add}>
					<Button onClick={() => { handleAdd() }}>Add new web</Button>
				</Group>
				</FocusTrap>
			</Stack>
		</form>
	)
})
