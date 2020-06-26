// import React from 'react';
// import ModalBtn from './buttonFunctions/buttonClickHandler';

// interface Props {
//   toggleOpenModalState: () => {};
//   errorModal: boolean;
// }

// export default function AlartModal(props: Props) {
//   console.log("Modal Component", props);

//   const { toggleOpenModalState } = props;

//   return (
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">{props.props.errorModal.modalMessage}</h5>
//         <ModalBtn buttonName="CLOSE" ClickHandler={toggleOpenModalState} />
//       </div>
//       <div className="modal-body">
//         <p>{props.props.message}</p>
//       </div>
//       <div className="modal-footer">
//         <ModalBtn buttonName="CLOSE" ClickHandler={toggleOpenModalState} />
//       </div>
//     </div>
//   )
// }
