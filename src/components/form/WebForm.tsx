import { Button, FocusTrap, Group, MultiSelect, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { memo, useEffect, useState } from "react"
import { UseWebs } from "../../hooks/UseWebs"
import { Web, WebFormMode } from "../../Types"
import { getDomain, urlRegex } from "../../utils/utils"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"
import signalJs from 'signal-js'
import Signals from "../../Signals"

interface Props {
	setOpened: Function,
	web?: Web,
	category?: string,
	mode: WebFormMode,
}

interface FormValues {
	url: string,
	name: string,
	category: string,
	tags: string[]
}


const WebForm = memo((props: Props) => {
	const webHook = UseWebs()
	const [categoryData, setCategoryData] = useState<string[]>(webHook.getWebs().categoryOrder)
	const [tagsData, setTagsData] = useState<string[]>(webHook.getUniqueTags())
	const [mode, setMode] = useState(props.mode)

	console.log(webHook.getUniqueTags())

	const { web } = props
	const theme = useMantineTheme()


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

	const formValues = useForm<FormValues>({
		initialValues: {
			url: "",
			name: "",
			category: props.category ? props.category : "",
			tags: []
		},

	})

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
		// TODO check duplicate
		// TODO si hay duplicate, mostrar error
		const web: Web = {
			id: 0,
			url: formValues.values.url,
			name: formValues.values.name,
			tags: formValues.values.tags,
		}

		signalJs.emit(Signals.addWeb, web, formValues.values.category)

	}
	const handleUpdate = (newWeb: Web, oldWeb: Web, category: string) => signalJs.emit(Signals.updateWeb, newWeb, oldWeb, category)
	const handleDelete = (web: Web) => signalJs.emit(Signals.deleteWeb, web)


	const handleSubmit = (values: FormValues) => {
		if (Object.keys(formValues.errors).length === 0) {
			console.log("no hay errores")
		} else {
			console.log("hay errores")
		}
	}

	return (
		<form>
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
					<Select
						label="Category"
						disabled={props.category ? true : false}
						placeholder="Pick one"
						data={categoryData}
						{...formValues.getInputProps('category')}
						required
						searchable
						getCreateLabel={(query) => `Create ${query}`}
						onCreate={(query) => setCategoryData([...categoryData, query])}
					/>
					<MultiSelect
						label="Tags"
						placeholder="Pick all tags you like"
						data={tagsData}
						{...formValues.getInputProps('tags')}
						searchable
						clearable
						getCreateLabel={(query) => `Create ${query}`}
						onCreate={(query) => setTagsData([...tagsData, query])}
					/>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.update}>
						<DeleteButtonTooltip clicksRemaining={2} handleDelete={() => signalJs.emit('basic', "TODO handleDelete WebForm")} />
						<Button onClick={() => signalJs.emit('basic', "TODO handleUpdate WebForm")}>Update web</Button>
						{/* TODO: Usar en version movil */}
						{/* <DeleteButtonModal web={web} handleDelete={handleDelete} setOpened={props.setOpened}/> */}
					</Group>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.add}>
						<Button onClick={() => handleAdd()}>Add new web</Button>
					</Group>
				</FocusTrap>
			</Stack>
		</form>
	)
})


export default WebForm
