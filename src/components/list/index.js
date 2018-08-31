import React from 'react';
import { List, AutoSizer } from 'react-virtualized';

const Item = ({ children, style}) =>(
  <div style={{padding: "6px 12px", textAlign: "left", border: "1px solid #ddd", ...style}}>
    { children }
  </div>
)

const rowRenderer =  ({
  index,       // Index of row
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  key,         // Unique key within array of rendered rows
  parent,      // Reference to the parent List (instance)
  style        // Style object to be applied to row (to position it);
               // This must be passed through to the rendered row element.
}) => {
  return(
    <Item
      key={key}
      style={style}
    >
      { parent.props.list[index] }
    </Item>
  )
}

const ExampleList = props => (
  <div style={{marginBottom: '1rem'}}>
    <AutoSizer disableHeight>
      {
        ({width})=>(
          <List
            height={300}
            width={width}
            list={props.list}
            rowCount={props.list.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
          />
        )
      }
    </AutoSizer>
  </div>
)

export default ExampleList;