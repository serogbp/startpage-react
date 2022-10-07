import { MouseEvent } from 'react'
import {
	Badge,
	Selectors,
	Highlight,
	UnstyledButton,
	Group,
	Center,
	Text,
	Stack
} from '@mantine/core';

import useStyles from './CustomActionStyle';
import { SpotlightActionProps } from '@mantine/spotlight';
import { useSettings } from '../../hooks/UseSettings';

export type DefaultActionStylesNames = Selectors<typeof useStyles>;


export function CustomAction({ action, styles, classNames, hovered, onTrigger, highlightQuery, highlightColor, query, radius, ...others }: SpotlightActionProps) {
	const props = { action, styles, classNames, hovered, onTrigger, highlightQuery, highlightColor, query, radius, ...others }
	if (action.web) return CustomActionWeb({ ...props })
	return CustomActionDefault({ ...props })
}

CustomAction.displayName = '@mantine/spotlight/DefaultAction';


function CustomActionDefault({ action, styles, classNames, hovered, onTrigger, highlightQuery, highlightColor, query, radius, ...others }: SpotlightActionProps) {
	const { classes, cx } = useStyles({ radius }, { classNames, name: 'Spotlight' });

	return (
		<UnstyledButton
			className={cx(classes.action, { [classes.actionHovered]: hovered })}
			tabIndex={-1}
			onMouseDown={(event: MouseEvent) => event.preventDefault()}
			onClick={onTrigger}
			{...others}
		>
			<Group noWrap align="top">
				{action.icon && <Center className={classes.actionIcon}>{action.icon}</Center>}

				<div className={classes.actionBody}>
					<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
						{action.title}
					</Highlight>

					{action.description && (
						<Text color="dimmed" size="xs">
							{action.description}
						</Text>
					)}
				</div>
			</Group>
		</UnstyledButton>
	)
}


function CustomActionWeb({ action, styles, classNames, hovered, onTrigger, highlightQuery, highlightColor, query, radius, ...others }: SpotlightActionProps) {
	const { classes, cx } = useStyles({ radius }, { classNames, name: 'Spotlight' })
	const settings = useSettings()

	return (

		<Group>
			<UnstyledButton
				className={cx(classes.action, { [classes.actionHovered]: hovered })} style={{ flexGrow: 2 }}
				tabIndex={-1}
				onMouseDown={(event: MouseEvent) => event.preventDefault()}
				onClick={onTrigger}
				{...others}
			>
				<Group>
					{action.icon && <Center className={classes.actionIcon}>{action.icon}</Center>}
					<Stack className={classes.actionBody}>
						<div>
							{/* Nombre */}
							<Text className={classes.wordBreak}>
								<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
									{action.web.name}
								</Highlight>
							</Text>
							<Group>

								{/* Url */}
								<Text color="dimmed" size="xs" className={classes.wordBreak}>
									<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
										{action.web.url}
									</Highlight>
								</Text>

								{/* Categoría*/}
								<Badge key={action.category} size="xs" color="gray" variant="outline">
									<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
										{action.category}
									</Highlight>
								</Badge>

								{/* Tags */}
								{
									action.web.tags.length > 0 &&
									<Group spacing="xs">
										{
											action.web.tags.map((tag: string) =>
												<Text key={tag} size="xs" color={settings.accentColor.name} >
													<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
														{"#" + tag}
													</Highlight>
												</Text>
											)
										}
									</Group>
								}
							</Group>
						</div>
					</Stack>
				</Group>
			</UnstyledButton>

			{/* Botón para lanzar WebFormUpdate */}
			{/* <ActionIcon
				onClick={() => {
					toggleSpotlight()
					console.log("click")
					// useModal.webEdit(action.web, action.category)
				}}
				variant="transparent"
				size="xl"
				className={classes.actionIcon}
			>
				<Pencil />
			</ActionIcon> */}
		</Group>
	)
}
