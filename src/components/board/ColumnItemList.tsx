import { useState, memo, useCallback, useEffect } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./ColumnItem"
import { Virtuoso } from "react-virtuoso"
import { createStyles } from "@mantine/core"


interface Props {
	droppableId: string,
	webs: Web[]
}

const useStyles = createStyles((theme) => ({
	columnList: {
		marginLeft: ".5em",
		marginRight: ".5em",
	}
}))


const ColumnItemList = memo((props: Props) => {
	const { classes } = useStyles()

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
		<Droppable droppableId={props.droppableId} direction="vertical" type="columnItem" mode="virtual"
			renderClone={(provided, snapshot, rubric) => (

				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<ColumnItem web={props.webs[rubric.source.index]} category={props.droppableId} />
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
						width: 250,
						overflowY:"auto",
						scrollbarWidth: "thin"
					}}
					totalCount={props.webs.length}
					data={props.webs}
					itemContent={index => {
						return (
							<Draggable draggableId={props.webs[index].id.toString()} index={index} key={props.webs[index].id}>
								{(provided) => (
									<div
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}>
										<div className={classes.columnList}>
											<ColumnItem web={props.webs[index]} category={props.droppableId} />
										</div>
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

export default ColumnItemList
