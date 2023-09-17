import React from 'react';
import { Button, Modal } from 'flowbite-react';


const AlertModalComponent = ({openModal, setOpenModal, setConfirmRemove, modalheader} : {openModal: string |undefined, setOpenModal : Function, setConfirmRemove: Function, modalheader: string}) => {

    const Answer = () => {
        setConfirmRemove(true)
        setOpenModal(undefined)
    }

  return (
    <>
      <Modal size={'sm'}show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
        <Modal.Header>{modalheader}</Modal.Header>
        <Modal.Footer className='flex justify-center'>
        <Button color="gray" onClick={() =>setOpenModal(undefined)}>
            Decline
          </Button>
          <Button onClick={() => Answer()}>I accept</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AlertModalComponent