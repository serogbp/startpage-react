import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { createStyles, useMantineTheme } from "@mantine/core"
import { ColumnTitle } from "./ColumnTitle"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}


export const useStyles = createStyles((theme) => ({
	column: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
		height: "100%",
		borderRadius: theme.radius.sm
	},
	title: {
		textAlign: "center",
		margin: 0,
		padding: "1em"
	},
	titleContainer: {
		'&hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		}
	},
	settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: "1em",
	}
}))

const Column = memo((props: Props) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()

	const handleClick = () => {
		// TODO popover
	}

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>

					<div className={classes.column}>
						<ColumnTitle name={props.name} dragHandleProps={provided.dragHandleProps} />
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


export default Column
