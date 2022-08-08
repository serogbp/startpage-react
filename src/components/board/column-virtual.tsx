import { useState, memo, useCallback, useEffect } from "react"
import { Web, WebFormMode } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./columnItem"
import { Virtuoso } from "react-virtuoso"
import { createStyles, useMantineTheme } from "@mantine/core"
import AddWebButton from "./AddWebButton"
import { openContextModal } from "@mantine/modals"

interface Props {
	name: string,
	webs: Web[],
	index: number
}

// Virtuoso's resize observer can this error,
// which is caught by DnD and aborts dragging.
window.addEventListener("error", (e) => {
	if (
		e.message ===
		"ResizeObserver loop completed with undelivered notifications." ||
		e.message === "ResizeObserver loop limit exceeded"
	) {
		e.stopImmediatePropagation();
	}
});

const useStyles = createStyles((theme) => ({
	column: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
		padding: "8px",
		height: "100%",
		borderRadius: theme.radius.sm
	}
}))

const ColumnVirtual = memo((props: Props) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>

					<div className={classes.column}>
						<p {...provided.dragHandleProps} >{props.name}</p>
						<ItemList name={props.name} webs={props.webs} />
						<AddWebButton category={props.name}/>
					</div>
				</div>

			)}
		</Draggable>
	)
})



interface ItemListProps {
	name: string,
	webs: Web[]
}
const ItemList = memo((props: ItemListProps) => {
	// @ts-ignore
	const HeightPreservingItem = useCallback(({ children, ...props }) => {
		const [size, setSize] = useState(0);
		const knownSize = props["data-known-size"];
		useEffect(() => {
			setSize((prevSize) => {
				return knownSize == 0 ? prevSize : knownSize;
			});
		}, [knownSize]);
		// check style.css for the height-preserving-container rule
		return (
			<div
				{...props}
				className="height-preserving-container"
				style={{
					// @ts-ignore
					"--child-height": `${size}px`
				}}
			>
				{children}
			</div>
		);
	}, []);

	return (
		<Droppable droppableId={props.name} direction="vertical" type="columnItem" mode="virtual"
			renderClone={(provided, snapshot, rubric) => (

				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<ColumnItem web={props.webs[rubric.source.index]} />
				</div>

			)}>
			{(provided) => (

				<Virtuoso
					components={
						// @ts-ignore
						{ Item: HeightPreservingItem }
					}
					//@ts-ignore
					scrollerRef={provided.innerRef}
					style={{
						width: 200,
						// overflowX:"hidden",
					}}
					totalCount={props.webs.length}
					data={props.webs}
					itemContent={index => {
						return (
							<Draggable draggableId={props.webs[index].id} index={index} key={props.webs[index].id}>
								{(provided) => (
									<div
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}>
										<ColumnItem web={props.webs[index]} />
									</div>
								)}
							</Draggable>
						)
					}}
				/>

			)}
		</Droppable>
	)
})


export default ColumnVirtual
