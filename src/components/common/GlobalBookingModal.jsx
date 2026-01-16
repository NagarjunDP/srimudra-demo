import React from 'react';
import { useModal } from '../../context/ModalContext';
import Modal from './Modal';
import LeadForm from './LeadForm';

const GlobalBookingModal = () => {
    const { isModalOpen, closeModal } = useModal();

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Start Planning Your Event"
        >
            <div className="mb-4 text-gray-600 text-sm">
                Fill out the form below and our team will contact you with a customized quote and venue options.
            </div>
            <LeadForm onSuccess={closeModal} />
        </Modal>
    );
};

export default GlobalBookingModal;
