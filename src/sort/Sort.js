import React, { Component } from 'react';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import {
	ListItem,
	RemoveListItem,
	SortableComponent,
	SortableListContainer,
	SortableListItem,
	TextInput
} from './styles.js';

class Sort extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}
	state = {
		items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Really long item 6']
	};
	addItem = newItem => {
		return this.setState(prevState => ({
			items: [...prevState.items, newItem]
		}));
	};
	handleRemove = (event, itemToBeRemoved) => {
		event.preventDefault();
		if (!itemToBeRemoved) return;
		this.removeItem(itemToBeRemoved);
	};
	handleSubmit = event => {
		event.preventDefault();
		const newItem = this.inputRef.current.value;
		if (!newItem) return;
		this.addItem(newItem);
		event.target.reset();
	};
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex)
		});
	};
	removeItem = itemToBeRemoved => {
		return this.setState(prevState => ({
			items: prevState.items.filter(item => item !== itemToBeRemoved)
		}));
	};
	render() {
		const SortableItem = SortableElement(({ value }) => (
			<SortableListItem>
				<ListItem>{value}</ListItem>
				<RemoveListItem onClick={event => this.handleRemove(event, value)}>
					x
				</RemoveListItem>
			</SortableListItem>
		));

		const SortableList = SortableContainer(({ items }) => (
			<SortableListContainer>
				{items.map((value, index) => (
					<SortableItem key={`item-${index}`} index={index} value={value} />
				))}
			</SortableListContainer>
		));

		return (
			<SortableComponent>
				<h1>Sortable list</h1>
				<form onSubmit={e => this.handleSubmit(e)}>
					<TextInput
						autoComplete="off"
						defaultValue=""
						placeholder="Type a new item and press Enter"
						ref={this.inputRef}
						type="text"
					/>
				</form>
				<SortableList
					axis={'x'}
					items={this.state.items}
					onSortEnd={this.onSortEnd}
				/>
			</SortableComponent>
		);
	}
}
export default Sort;