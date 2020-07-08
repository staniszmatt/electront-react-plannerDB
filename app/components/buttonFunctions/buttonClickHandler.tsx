/* eslint-disable prettier/prettier */
import * as React from 'react';

interface NewButton {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
}

export default function ButtonHandle(props: NewButton) {
  const handleClick = (event) => {
    event.preventDefault();
    props.ClickHandler(event, props)
  }
  return (
    <button props={event} onClick={(event) => {handleClick(event)}} type="button">
      {props.buttonName}
    </button>
  )
}
