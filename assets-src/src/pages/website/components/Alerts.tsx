import { Alert, Anchor, Text } from "@twilio-paste/core";
import { useDispatch, useSelector } from "react-redux";

import { removeAlert } from "../../../store/actions/alertActions";
import { AppState } from "../../../store/definitions";

export const Alerts = () => {
    const { alert } = useSelector((state: AppState) => ({ alert: state.alert }));
    const dispatch = useDispatch();

    const { variant, message } = alert;

    if (!message) {
        return null;
    }

    return (
        <Alert variant={variant}>
            <Text as="span">
                {message}{" "}
                <Anchor onClick={() => dispatch(removeAlert())} href="#">
                    Dismiss
                </Anchor>
            </Text>
        </Alert>
    );
};
