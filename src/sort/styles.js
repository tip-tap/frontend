import styled from 'styled-components';

export const ListItem = styled.span`
	letter-spacing: 0.035rem;
	text-transform: uppercase;
`;

export const SortableComponent = styled.div`
	font-family: sans-serif;
`;

export const RemoveListItem = styled.button`
	appearance: none;
	background: transparent;
	border: 0;
	color: #2e2e2e;
	cursor: pointer;
	display: inline-block;
	font-family: inherit;
	font-size: 0.7rem;
	line-height: 1.15;
	margin: 0 0 0 0.25rem;
	padding: 0.25rem;
	-webkit-appearance: none;
`;

export const SortableListContainer = styled.ul`
	display: flex;
	height: 3rem;
	overflow-x: auto;
	padding: 0;
	user-select: none;
	width: 100%;
	-webkit-overflow-scrolling: touch;
`;

export const SortableListItem = styled.li`
	align-items: center;
	border-radius: 1.875rem;
	border: 1px solid #2e2e2e;
	color: #2e2e2e;
	cursor: col-resize;
	display: flex;
	font-family: sans-serif;
	font-size: 0.6875rem;
	height: 2rem;
	justify-content: center;
	margin-right: 1rem;
	padding: 0 1em;
	white-space: nowrap;
`;

export const TextInput = styled.input`
	border: 1px solid #ccc;
	border-radius: 0;
	margin: 0 0 0.5em;
	padding: 1em;
	max-width: 16rem;
	width: 90%;
`;
