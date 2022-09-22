import React, { MouseEvent, useState } from 'react';
import {
	DefaultProps,
	Selectors,
	Highlight,
	UnstyledButton,
	Group,
	Center,
	Text,
	MantineNumberSize,
	MantineColor,
} from '@mantine/core';

import useStyles from './CustomActionStyle';
import { closeSpotlight, SpotlightAction, SpotlightActionProps, toggleSpotlight } from '@mantine/spotlight';
import { ActionIcon } from '@mantine/core';
import { useModal } from '../hooks/UseModal';
import { Pencil } from 'tabler-icons-react';

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


	return (

		<Group noWrap grow
		>
			<UnstyledButton
				className={cx(classes.action, { [classes.actionHovered]: hovered })} style={{ flexGrow: 2 }}
				tabIndex={-1}
				onMouseDown={(event: MouseEvent) => event.preventDefault()}
				onClick={onTrigger}
				{...others}
			>
				<Group noWrap align="top">
					{action.icon && <Center className={classes.actionIcon}>{action.icon}</Center>}

					<div className={classes.actionBody}>

						<Group position='apart' noWrap>
							<Text className={classes.wordBreak}>
								<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
									{action.web.name}
								</Highlight>
							</Text>

							<Text align='right' color="dimmed" size="xs" >
								<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
									{action.category}
								</Highlight>
							</Text>
						</Group>




						<Text color="dimmed" size="xs" className={[classes.truncate, classes.actionUrl].join(" ")}>
							<Highlight highlightColor={highlightColor} highlight={highlightQuery ? query : []}>
								{action.web.url}
							</Highlight>
						</Text>
					</div>



				</Group>
			</UnstyledButton>

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
