import { Button, Group, MultiSelect, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormEvent, memo, useEffect, useState } from "react"
import { Web, WebFormMode } from "../../Types"
import { getDomain, urlRegex } from "../../utils/utils"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"
import signalJs from 'signal-js'
import Signals from "../../Signals"
import { useBoard } from "../../hooks/useBoard/UseBoard"


interface Props {
	web?: Web,
	category?: string,
	handleClose?: () => void,
	mode: WebFormMode,
}

interface FormValues {
	url: string,
	name: string,
	category: string,
	tags: string[]
}


const WebForm = memo((props: Props) => {
	const board = useBoard()
	const [web, setWeb] = useState<Web>()
	const [category, setCategory] = useState(props.category)
	const [categoryData, setCategoryData] = useState<string[]>(board.state.categoryOrder)
	const [tagsData, setTagsData] = useState<string[]>(board.web.getUniqueTags())
	const [mode, setMode] = useState(props.mode)
	const theme = useMantineTheme()

	let duplicateWeb = web // Populada con la función isDuplicate()


	useEffect(() => {
		setWeb(props.web ? props.web : {
			id: 0,
			name: "",
			url: "",
			tags: [],
		})
	}, [])

	useEffect(() => {
		if (web) {
			formValues.setValues({
				url: web.url,
				name: web.name,
				category: category ?? "",
				tags: web.tags,
			})
		}
	}, [web])

	// Al pulsar en el boton, pasas a modificar en el formulario la web duplicada
	const duplicateMessage = () => {
		const categoryName = duplicateWeb ? board.category.getName(duplicateWeb) : ""
		return (
			<>
				<Text>
					Already exists in the category {categoryName}.
				</Text>
				<UnstyledButton
					onClick={(event: React.MouseEvent<Element, MouseEvent>) => {
						event.preventDefault()
						setCategory(categoryName)
						if (duplicateWeb) setWeb(duplicateWeb)
						setMode(WebFormMode.update)
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
		if (props.handleClose !== undefined) props.handleClose()
	}

	const formValues = useForm<FormValues>({
		initialValues: {
			url: "",
			name: "",
			tags: [],
			category: "",
		},
		validate: {
			url: (value) => isDuplicate(value) ? duplicateMessage() : null
		}
	})


	const getFormValues = (): Web => {
		return {
			id: web?.id || 0, // Si web no es nulo es modo update
			url: formValues.values.url,
			name: formValues.values.name,
			tags: formValues.values.tags,
		}
	}

	const isDuplicate = (url: string) => {
		// Si estas modificando una web sin cambiar su url no es duplicado
		if (web?.url === url)
			return false
		else {
			duplicateWeb = board.web.isUrlDuplicated(url)
			return (duplicateWeb !== undefined)
		}
	}


	const onBlurInputUrl = () => {
		if (formValues.values.url !== "")
			autoCompleteInputName()
	}


	const autoCompleteInputName = () => {
		const { url, name } = formValues.values
		if (urlRegex.test(url) && name === '') {
			formValues.setFieldValue('name', getDomain(url))
		}
	}


	const handleAdd = () => {
		const web = getFormValues()
		signalJs.emit(Signals.addWeb, web, formValues.values.category)
		closeForm()
	}


	const handleUpdate = () => {
		const newWeb = getFormValues()
		const oldCategory = category
		const newCategory = formValues.values.category
		signalJs.emit(Signals.updateWeb, newWeb, newCategory, oldCategory)
		closeForm()
	}


	const handleDelete = () => {
		signalJs.emit(Signals.deleteWeb, web, props.category)
		closeForm()
	}


	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		switch (mode) {
			case WebFormMode.add:
				handleAdd()
				break;
			case WebFormMode.update:
				handleUpdate()
				break;
			default:
				break;
		}
	}

	return (
		<form onSubmit={formValues.onSubmit((values, event) => handleSubmit(event))}>
			<Stack spacing='xs'>

					<TextInput
						label="Url"
						type="url"
						required
						placeholder="https://www.example.com"
						{...formValues.getInputProps('url')}
						onBlur={() => onBlurInputUrl()}
						data-autofocus
						style={{width:"100%"}}
					/>

					<TextInput
						label="Name"
						required
						placeholder="Example"
						{...formValues.getInputProps('name')}
						style={{width:"100%"}}
					/>

					<div hidden={props.category && mode === WebFormMode.add ? true : false}>
						<Select
							label="Category"
							disabled={props.category && mode === WebFormMode.add ? true : false}
							placeholder="Pick one"
							data={categoryData}
							{...formValues.getInputProps('category')}
							required
							searchable
							getCreateLabel={(query) => `Create ${query}`}
							onCreate={(query) => setCategoryData([...categoryData, query])}
						/>
					</div>

					<MultiSelect
						label="Tags"
						placeholder="Pick all tags you like"
						data={tagsData}
						{...formValues.getInputProps('tags')}
						searchable
						clearable
						creatable
						getCreateLabel={(query) => `Create ${query}`}
						onCreate={(query) => setTagsData([...tagsData, query])}
					/>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.update}>
						<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} text={"Delete"} variant={"subtle"}/>
						<Button type="submit">Update</Button>
					</Group>

					<Group position="right" mt='md' hidden={mode !== WebFormMode.add}>
						<Button type="submit">Create</Button>
					</Group>

			</Stack>
		</form>
	)
})

WebForm.displayName = "WebForm"
export default WebForm
