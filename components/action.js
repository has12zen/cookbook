import React, { useState } from 'react';
import {
    ButtonGroup,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';


const Add = (props) => {
    return (
        <>
            <Modal
                isCentered
                onClose={props.AddOnClose}
                isOpen={props.AddIsOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup d="flex" justifyContent="flex-end">
                            <Button mr={3} variant="outline" onClick={props.AddOnClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    props.AddOnSubmit();
                                }}
                                colorScheme="teal"
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Add;