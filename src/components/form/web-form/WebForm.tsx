import { Space, Button, Group, Stack, Text, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormEvent, memo, useEffect, useState } from "react"
import { Web, WebFormMode, WebFormValues, WebIconType } from "../../../Types"
import { removeLastSlash } from "../../../utils/utils"
import { DeleteButtonTooltip } from "../DeleteButtonToolTip"
import { defaultWeb, defaultWebStringIcon, useBoard } from "../../../hooks/useBoard/UseBoard"
import { useModal } from "../../../hooks/UseModal"
import InputUrl from "./inputs/InputUrl"
import InputName from "./inputs/InputName"
import InputCategory from "./inputs/InputCategory"
import InputTag from "./inputs/InputTag"
import InputIconType from "./inputs/InputIconType"
import InputStringIcon from "./inputs/InputStringIcon"
import Preview from "./Preview"


interface Props {
	web?: Web,
	category?: string,
	handleClose: () => void,
	mode: WebFormMode,
	isModal: boolean
}


const WebForm = memo((props: Props) => {
	const board = useBoard()
	const [web, setWeb] = useState<Web>()
	const [category, setCategory] = useState(props.category)

	const [mode, setMode] = useState(props.mode)
	const theme = useMantineTheme()

	let duplicateWeb = web // Populada con la función isDuplicate()


	useEffect(() => {
		setWeb(props.web ? props.web : {
			...defaultWeb,
		})
	}, [])


	useEffect(() => {
		if (web) {
			formValues.setValues({
				...web,
				iconType: web.iconType ?? WebIconType.none,
				category: category ?? "",
				stringIconText: web.stringIcon?.text ?? web.name.substring(0,3),
				stringIconTextColor: web.stringIcon?.textColor ?? defaultWebStringIcon.textColor,
				stringIconBackground: web.stringIcon?.backgroundColor ?? defaultWebStringIcon.backgroundColor,
			})
		}
	}, [web])


	const formValues = useForm<WebFormValues>({
		initialValues: {
			...defaultWeb,
			category: "",
			stringIconText: defaultWebStringIcon.text,
			stringIconTextColor: defaultWebStringIcon.textColor,
			stringIconBackground: defaultWebStringIcon.backgroundColor,
		},
		validate: {
			url: (value) => isDuplicate(removeLastSlash(value)) ? duplicateMessage() : null
		}
	})


	const openDuplicateForm = () => {
		if (duplicateWeb) {
			const category = board.category.getName(duplicateWeb)
			if (props.isModal) {
				// Es modal, poner en modo update
				if (props.mode === WebFormMode.add) setMode(WebFormMode.update)
				// Setear los datos de la web duplicada
				setCategory(category)
				setWeb(duplicateWeb)
			}
			else {
				// Es popover, cerrar y abrir modal en modo update
				props.handleClose()
				useModal.webEdit(duplicateWeb, category)
			}
		}
	}


	// Al pulsar en el botón, pasas a modificar en el formulario la web duplicada
	const duplicateMessage = () => {
		const categoryName = duplicateWeb ? board.category.getName(duplicateWeb) : ""
		return (
			<>
				<Text>
					Already exists in the category {categoryName}
				</Text>
				<UnstyledButton onClick={openDuplicateForm} style={{ color: theme.colors.blue[5], textDecoration: 'underline' }}>
					Do you want to modify it instead?
				</UnstyledButton>
			</>
		)
	}


	const getFormValues = (): Web => {
		return {
			...(web ? web : defaultWeb),
			id: web?.id || 0, // Si web no es nulo es modo update, si no el id se pone en boardWeb.add()
			url: formValues.values.url,
			name: formValues.values.name,
			tags: formValues.values.tags,
			iconType: formValues.values.iconType,
			stringIcon: {
				text: formValues.values.stringIconText,
				textColor: formValues.values.stringIconTextColor,
				backgroundColor: formValues.values.stringIconBackground,
			}
		}
	}


	const isDuplicate = (url: string) => {
		// Si estas modificando una web sin cambiar su url no es duplicado
		if (web?.url === url)
			return false
		else {
			duplicateWeb = board.web.isDuplicate(removeLastSlash(url))
			return (duplicateWeb !== undefined)
		}
	}


	const handleAdd = () => {
		board.web.add(getFormValues(), formValues.values.category)
		props.handleClose()
	}


	const handleUpdate = () => {
		const oldCategory = category ?? ""
		const newCategory = formValues.values.category
		board.web.update(getFormValues(), newCategory, oldCategory)
		props.handleClose()
	}


	const handleDelete = () => {
		if (web && props.category) board.web.remove(web, props.category)
		props.handleClose()
	}


	const handleSubmit = (values: FormValues, event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		switch (mode) {
			case WebFormMode.add:
				handleAdd()
				break
			case WebFormMode.update:
				handleUpdate()
				break
			default:
				break
		}
	}


	return (
		<form onSubmit={formValues.onSubmit((values, event) => handleSubmit(values, event))}>
			<Stack spacing='xs'>

				<InputUrl formValues={formValues} />

				<InputName formValues={formValues} />

				<InputCategory
					formValues={formValues}
					categories={board.state.categoryOrder}
					hidden={props.category && mode === WebFormMode.add ? true : false}
					disabled={props.category && mode === WebFormMode.add ? true : false}
				/>

				<InputTag
					formValues={formValues}
					tags={board.web.getUniqueTags()}
				/>

				<Space h="md" />

				<InputIconType formValues={formValues}/>

				{formValues.values.iconType === WebIconType.stringIcon &&
					<InputStringIcon formValues={formValues}/>
				}

				<Preview web={getFormValues()}/>

				<Group position="apart" mt='md' hidden={mode !== WebFormMode.update}>
					<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleDelete} text={"Delete"} variant={"subtle"} />
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
