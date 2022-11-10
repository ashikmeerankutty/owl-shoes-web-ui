import {
    Box,
    Button,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalFooterActions,
    ModalHeader,
    ModalHeading,
    Text
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/uid-library";
import { FC } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../../store/definitions";

interface PhoneContactModalProps {
    onDismiss: () => void;
}

export const PhoneContactModal: FC<PhoneContactModalProps> = ({ onDismiss }) => {
    const { isOpen } = useSelector((state: AppState) => ({ isOpen: state.contactModal.isPhoneModalOpen }));
    const modalHeadingID = useUID();

    return (
        <div>
            <Modal ariaLabelledby={modalHeadingID} isOpen={isOpen} onDismiss={onDismiss} size="default">
                <ModalHeader>
                    <ModalHeading as="h3" id={modalHeadingID}>
                        Phone Call
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>
                    <Text as="p">
                        Call sales department at <strong>601-283-6846</strong>.
                    </Text>
                    <Text as="p">
                        <strong> or </strong> If you would like us to call you back, please submit your name and phone
                        number below.
                    </Text>
                    <Box marginTop="space50">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            aria-describedby="name"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                        />
                    </Box>
                    <Box marginTop="space50">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            aria-describedby="phone"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="(832) 789 2849"
                            required
                        />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <ModalFooterActions>
                        <Button variant="primary">Submit</Button>
                    </ModalFooterActions>
                </ModalFooter>
            </Modal>
        </div>
    );
};
