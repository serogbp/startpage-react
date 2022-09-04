import { Button, FocusTrap, Group, MultiSelect, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { memo, useEffect, useState } from "react"
import { Web, WebFormMode } from "../../Types"
import { getDomain, urlRegex } from "../../utils/utils"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"
import signalJs from 'signal-js'
import Signals from "../../Signals"
import { UseWebs } from "../../hooks/UseWebs"


interface Props {
	web?: Web,
	category: string,
	handleClose?: Function,
	mode: WebFormMode,
}

interface FormValues {
	url: string,
	name: string,
	category: string,
	tags: string[]
}


const WebForm = memo((props: Props) => {
	const useWebs = UseWebs()
	const [web, setWeb] = useState<Web>()
	const [category, setCategory] = useState(props.category)
	const [categoryData, setCategoryData] = useState<string[]>(useWebs.getWebs().categoryOrder)
	const [tagsData, setTagsData] = useState<string[]>(useWebs.getUniqueTags())
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
				category: category,
				tags: web.tags,
			})
		}
	}, [web])

	// Al pulsar en el boton, pasas a modificar en el formulario la web duplicada
	const duplicateMessage = () => {
		const newCategory = useWebs.getCategory(duplicateWeb!)
		return (
			<>
				<Text>
					Already exists in the category {newCategory}.
				</Text>
				<UnstyledButton
					onClick={(event: any) => {
						event.preventDefault()
						setCategory(newCategory)
						setWeb(duplicateWeb!)
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
			duplicateWeb = useWebs.isUrlDuplicated(url)!
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


	const handleSubmit = (event: any) => {
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
				<FocusTrap active={true}>
					<TextInput
						label="Url"
						type="url"
						required
						placeholder="https://www.example.com"
						{...formValues.getInputProps('url')}
						onBlur={() => onBlurInputUrl()}
						data-autofocus
					/>

					<TextInput
						label="Name"
						required
						placeholder="Example"
						{...formValues.getInputProps('name')}
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
						<DeleteButtonTooltip clicksRemaining={2} handleDelete={() => handleDelete()} text={"Delete web"} variant={"subtle"}/>
						<Button type="submit">Update web</Button>
					</Group>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.add}>
						<Button type="submit">Add new web</Button>
					</Group>

				</FocusTrap>
			</Stack>
		</form>
	)
})


export default WebForm
