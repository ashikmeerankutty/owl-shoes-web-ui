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
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAlert } from "../../../store/actions/alertActions";
import { AppState } from "../../../store/definitions";
import { getFriendlySlotText } from "../utils/schedule";
import { ScheduleMeetingCalendar } from "./ScheduleMeetingCalendar";
import { ScheduleMeetingConfirm } from "./ScheduleMeetingConfirm";
import { ScheduleMeetingContact } from "./ScheduleMeetingContact";

enum SchedulePhases {
    SELECT_DATE_TIME = "SELECT_DATE_TIME",
    ADD_CONTACT_INFO = "ADD_CONTACT_INFO",
    CONFIRM_SCHEDULE = "CONFIRM_SCHEDULE"
}

enum ButtonCTA {
    CONTINUE = "CONTINUE",
    CONFIRM = "CONFIRM"
}

interface ScheduleMeetingModalProps {
    onDismiss: () => void;
}

const schedulePhaseInfo = {
    [SchedulePhases.SELECT_DATE_TIME]: {
        body: <ScheduleMeetingCalendar />,
        buttonCTA: ButtonCTA.CONTINUE,
        nextPhase: SchedulePhases.ADD_CONTACT_INFO
    },
    [SchedulePhases.ADD_CONTACT_INFO]: {
        body: <ScheduleMeetingContact />,
        buttonCTA: ButtonCTA.CONTINUE,
        nextPhase: SchedulePhases.CONFIRM_SCHEDULE
    },
    [SchedulePhases.CONFIRM_SCHEDULE]: {
        body: <ScheduleMeetingConfirm />,
        buttonCTA: ButtonCTA.CONFIRM,
        nextPhase: null
    }
};
export const ScheduleMeetingModal: FC<ScheduleMeetingModalProps> = ({ onDismiss }) => {
    const [schedulePhase, setSchedulePhase] = useState(SchedulePhases.SELECT_DATE_TIME);
    const { isOpen, schedule } = useSelector((state: AppState) => ({
        isOpen: state.contactModal.isScheduleModalOpen,
        schedule: state.schedule
    }));
    const dispatch = useDispatch();
    const modalHeadingID = useUID();

    const { body, buttonCTA, nextPhase } = schedulePhaseInfo[schedulePhase];

    const onModalDismiss = () => {
        setSchedulePhase(SchedulePhases.SELECT_DATE_TIME);
        onDismiss();
    };

    const onButtonClick = () => {
        if (!nextPhase) {
            onModalDismiss();
            dispatch(
                addAlert({
                    variant: "neutral",
                    message: `Your meeting has been scheduled for ${getFriendlySlotText(schedule)}.`
                })
            );
            return;
        }
        setSchedulePhase(nextPhase);
    };

    const modalHeading =
        schedulePhase === SchedulePhases.CONFIRM_SCHEDULE
            ? `Schedule a Meeting for ${getFriendlySlotText(schedule)} ?`
            : "Schedule a Meeting";

    return (
        <div>
            <Modal
                ariaLabelledby={modalHeadingID}
                isOpen={isOpen}
                onDismiss={onModalDismiss}
                size={schedulePhase === SchedulePhases.SELECT_DATE_TIME ? "wide" : "default"}
            >
                <ModalHeader>
                    <ModalHeading as="h3" id={modalHeadingID}>
                        {modalHeading}
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <ModalFooterActions>
                        <Button onClick={onButtonClick} variant="primary">
                            {buttonCTA}
                        </Button>
                    </ModalFooterActions>
                </ModalFooter>
            </Modal>
        </div>
    );
};
