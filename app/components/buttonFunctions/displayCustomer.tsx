/* eslint-disable prettier/prettier */
import * as React from 'react';
import { render } from 'enzyme';

interface NewButton {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonName: string;
}

export default function ToggleCusotmerList(props: NewButton) {
    return (
      <button onClick={props.ClickHandler} data-tclass="btn">
      {props.buttonName}
      </button>
  )
}
