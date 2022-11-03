import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { WebchatWidget } from "../WebchatWidget";
import { sessionDataHandler } from "../../sessionDataHandler";
import * as genericActions from "../../store/actions/genericActions";
import * as initActions from "../../store/actions/initActions";
import { EngagementPhase } from "../../store/definitions";

jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn()
}));

jest.mock("../../sessionDataHandler", () => ({
    sessionDataHandler: {
        tryResumeExistingSession: jest.fn()
    }
}));

jest.mock("../../store/actions/initActions", () => ({
    initSession: jest.fn()
}));

jest.mock("../../store/actions/genericActions", () => ({
    changeEngagementPhase: jest.fn()
}));

jest.mock("../RootContainer", () => ({
    RootContainer: () => <div title="RootContainer" />
}));

describe("Webchat Lite", () => {
    const sessionData = {
        token: "token",
        conversationSid: "sid"
    };

    beforeEach(() => {
        (sessionDataHandler.tryResumeExistingSession as jest.Mock).mockReturnValue(sessionData);
    });

    it("renders Webchat Lite", () => {
        const { container } = render(<WebchatWidget />);

        expect(container).toBeInTheDocument();
    });

    it("renders the root container", () => {
        const { queryByTitle } = render(<WebchatWidget />);

        expect(queryByTitle("RootContainer")).toBeInTheDocument();
    });

    it("initializes session with fetched session data", () => {
        const initSessionSpy = jest.spyOn(initActions, "initSession");

        render(<WebchatWidget />);

        expect(initSessionSpy).toHaveBeenCalledWith(sessionData);
    });
});
