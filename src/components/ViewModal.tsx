import React from "react"

interface ModalProps {
  modalId: string
  title: string
  bodyComponent: React.ReactNode
  actionsComponent?: React.ReactNode
  onClose: () => void
}

const ViewModal: React.FC<ModalProps> = ({
  modalId,
  title,
  bodyComponent,
  actionsComponent,
  onClose,
}) => {
  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="font-bold text-lg">{title}</h2>
        <div className="py-4">{bodyComponent}</div>
        <div className="modal-action">
          {actionsComponent || (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default ViewModal
