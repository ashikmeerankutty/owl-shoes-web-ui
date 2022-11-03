import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { AlertReducer } from "./alert.reducer";
import { ChatReducer } from "./chat.reducer";
import { ConfigReducer } from "./config.reducer";
import { ContactModalReducer } from "./contact.reducer";
import { NotificationReducer } from "./notification.reducer";
import { ScheduleReducer } from "./schedule.reducer";
import { SessionReducer } from "./session.reducer";

const typeWindow = window as unknown as { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose };

const composeEnhancers = typeWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    chat: ChatReducer,
    config: ConfigReducer,
    notifications: NotificationReducer,
    session: SessionReducer,
    contactModal: ContactModalReducer,
    schedule: ScheduleReducer,
    alert: AlertReducer
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
