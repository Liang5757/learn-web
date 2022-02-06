import React, { useState, Fragment } from "react";

const Tabs = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <Fragment>
      {
        React.Children.map(props.children, (child, index) => {
          if (child.type) {
            console.log(child, child.type)
            return React.cloneElement(child, {
              active: activeIndex === index,
              onClick: () => setActiveIndex(index)
            });
          } else {
            return child;
          }
        })
      }
    </Fragment>
  )
}

export default Tabs;
