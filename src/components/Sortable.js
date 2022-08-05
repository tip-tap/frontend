import React, {Component} from 'react';
import {render} from 'react-dom';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import styles from "../styles/components/sortable.module.scss";
import Checklist from "./Checklist";

const SortableItem = sortableElement(({value}) => <li className={styles.item}>{value}</li>);
const SortableContainer = sortableContainer(({children}) => {
  return <ul className={styles.container}>{children}</ul>;
});

export default class App extends Component {
  state = {
    items: [<Checklist></Checklist>, <Checklist></Checklist>, <Checklist></Checklist>,<Checklist></Checklist>, <Checklist></Checklist>, <Checklist></Checklist>, <Checklist></Checklist>],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMoveImmutable (items, oldIndex, newIndex),
    }));
  };

  render() {
    const {items} = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} axis="x" lockAxis="x"> 
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
      </SortableContainer>
    );
  }
}

render(<App />, document.getElementById('root'));