import React from "react"

interface ConfirmModalProps {
  modalId: string
  title: string
  description?: string
  onSuccess: () => void
  onCancel?: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  modalId,
  title,
  description = "Press ESC key or click the button below to close",
  onSuccess,
  onCancel,
}) => {
  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onSuccess}>
            Confirm
          </button>
          {onCancel && (
            <button className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmModal
