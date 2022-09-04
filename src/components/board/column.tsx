import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { createStyles, useMantineTheme } from "@mantine/core"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}


const useStyles = createStyles((theme) => ({
	column: {
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
	}
}))

const Column = memo((props: Props) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>

					<div className={classes.column}>
						<p {...provided.dragHandleProps} className={classes.title}>{props.name}</p>
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


export default Column
