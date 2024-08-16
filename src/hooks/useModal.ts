import { useState } from 'react';

type UseModalReturn = [
  boolean,
  (modalOpen: boolean) => void,
  () => void,
  () => void
];

const useModal = (initialMode: boolean = false): UseModalReturn => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const toggleOpen = () => setModalOpen(!modalOpen);
  const onClose = () => {
    setModalOpen(false);
  };
  return [modalOpen, setModalOpen, onClose, toggleOpen];
};

export default useModal;
