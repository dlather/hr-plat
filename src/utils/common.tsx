export const openModal = (modalId = "") => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null
  if (modal) {
    modal.showModal()
  } else {
    console.error("Modal element not found")
  }
}

export const closeModal = (modalId = "") => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null
  if (modal) {
    modal.close()
  } else {
    console.error("Modal element not found")
  }
}
