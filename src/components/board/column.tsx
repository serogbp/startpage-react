import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { ColumnTitle } from "./ColumnTitle"
import { useSettings } from "../../hooks/UseSettings"
import { useMantineTheme, createStyles } from "@mantine/core"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}

interface PropsStyle {
	backgroundColor: string
}

const useStyles = createStyles((theme, { backgroundColor }: PropsStyle, getRef) => ({
	column: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		backgroundColor: backgroundColor,
		height: "100%",
		borderRadius: theme.radius.sm,
	},
}))


const Column = memo((props: Props) => {
	const settings = useSettings()
	const theme = useMantineTheme()

	const backgroundColor = (() => {
		const dark = 7
		let color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.colors.gray[1]
		if (settings.accentColorElements) {
			color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.colors[settings.accentColor.name][1]
		}
		return color
	})()
	const { classes } = useStyles({backgroundColor})

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
					style={{width:settings.columnWidth}}
					>

					<div className={classes.column}>
						<ColumnTitle name={props.name} dragHandleProps={provided.dragHandleProps} />
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


Column.displayName = "Column"
export default Column
