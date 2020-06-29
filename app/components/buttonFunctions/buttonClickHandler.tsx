/* eslint-disable prettier/prettier */
import * as React from 'react';

interface NewButton {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
}

export default function ButtonHandle(props: NewButton) {

  return (
    <button onClick={props.ClickHandler} type="button">
      {props.buttonName}
    </button>
  )
}
