"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type {
  BrandKey,
  Capacity,
  ChatMessage,
  InboxItem,
  Project,
  ProjectCategory,
} from "@/lib/types";

/**
 * Ersatz für das globale `state`-Objekt aus dem Prototyp. Bewusst ein
 * einzelner React-Context + `useReducer` statt einer State-Library — die
 * Datenmenge in Phase 0 ist klein genug, dass das nicht overengineert ist.
 *
 * Persistiert wird hier nichts (siehe docs/implementation-plan.md § 7):
 * Reload = Ausgangszustand, weil es reine Demo-Daten sind. Die einzige
 * Ausnahme (Theme) läuft separat über `next-themes`.
 */

interface AppState {
  dailyCheckDone: boolean;
  capacity: Capacity;
  focusIndex: number;
  projects: Project[];
  workTab: ProjectCategory | "all";
  inbox: InboxItem[];
  contentBrand: BrandKey;
  chatLogs: Record<string, ChatMessage[]>;
  aiPanelOpen: boolean;
  aiPanelLog: ChatMessage[];
}

type Action =
  | { type: "SUBMIT_DAY_CHECK"; capacity: Capacity; focusIndex: number }
  | { type: "TOGGLE_TASK"; projectId: string; taskId: string }
  | { type: "SET_WORK_TAB"; tab: ProjectCategory | "all" }
  | { type: "SET_CONTENT_BRAND"; brand: BrandKey }
  | { type: "ADD_INBOX_ITEM"; item: InboxItem }
  | { type: "REMOVE_INBOX_ITEM"; id: string }
  | { type: "ADD_CHAT_MESSAGE"; contentId: string; message: ChatMessage }
  | { type: "SET_CHAT_LOG"; contentId: string; messages: ChatMessage[] }
  | { type: "TOGGLE_AI_PANEL" }
  | { type: "ADD_AI_PANEL_MESSAGE"; message: ChatMessage };

interface InitialData {
  inbox: InboxItem[];
  projects: Project[];
}

/**
 * `inbox` und `projects` kommen seit Phase 1 nicht mehr aus lokalen
 * Demo-Daten, sondern werden server-seitig aus Supabase geladen und von
 * `(app)/layout.tsx` als Props hereingereicht (siehe `AppStoreProvider`
 * unten) — die ersten realen Austauschpunkte aus dem Implementation Plan.
 * Content, Wissen und Rückblick laufen noch auf `lib/data/*`, siehe
 * docs/phase-0-result.md / phase-1-result.md.
 */
function createInitialState({ inbox, projects }: InitialData): AppState {
  return {
    dailyCheckDone: false,
    capacity: "normal",
    focusIndex: 0,
    projects,
    workTab: "all",
    inbox,
    contentBrand: "feelweb",
    chatLogs: {},
    aiPanelOpen: false,
    aiPanelLog: [
      {
        id: "ai-panel-welcome",
        who: "ai",
        text: "Ich bin überall im Tool für dich da. Frag mich zu dem, was du gerade siehst.",
      },
    ],
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SUBMIT_DAY_CHECK":
      return {
        ...state,
        dailyCheckDone: true,
        capacity: action.capacity,
        focusIndex: action.focusIndex,
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id !== action.projectId
            ? project
            : {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === action.taskId ? { ...task, done: !task.done } : task
                ),
              }
        ),
      };
    case "SET_WORK_TAB":
      return { ...state, workTab: action.tab };
    case "SET_CONTENT_BRAND":
      return { ...state, contentBrand: action.brand };
    case "ADD_INBOX_ITEM":
      return { ...state, inbox: [action.item, ...state.inbox] };
    case "REMOVE_INBOX_ITEM":
      return { ...state, inbox: state.inbox.filter((item) => item.id !== action.id) };
    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chatLogs: {
          ...state.chatLogs,
          [action.contentId]: [
            ...(state.chatLogs[action.contentId] ?? []),
            action.message,
          ],
        },
      };
    case "SET_CHAT_LOG":
      return {
        ...state,
        chatLogs: { ...state.chatLogs, [action.contentId]: action.messages },
      };
    case "TOGGLE_AI_PANEL":
      return { ...state, aiPanelOpen: !state.aiPanelOpen };
    case "ADD_AI_PANEL_MESSAGE":
      return { ...state, aiPanelLog: [...state.aiPanelLog, action.message] };
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  submitDayCheck: (capacity: Capacity, focusIndex: number) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  setWorkTab: (tab: ProjectCategory | "all") => void;
  setContentBrand: (brand: BrandKey) => void;
  addInboxItem: (item: InboxItem) => void;
  removeInboxItem: (id: string) => void;
  addChatMessage: (contentId: string, message: ChatMessage) => void;
  setChatLog: (contentId: string, messages: ChatMessage[]) => void;
  toggleAiPanel: () => void;
  addAiPanelMessage: (message: ChatMessage) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppStoreProvider({
  children,
  initialInbox,
  initialProjects,
}: {
  children: ReactNode;
  initialInbox: InboxItem[];
  initialProjects: Project[];
}) {
  const [state, dispatch] = useReducer(
    reducer,
    { inbox: initialInbox, projects: initialProjects },
    createInitialState
  );

  const submitDayCheck = useCallback(
    (capacity: Capacity, focusIndex: number) =>
      dispatch({ type: "SUBMIT_DAY_CHECK", capacity, focusIndex }),
    []
  );
  const toggleTask = useCallback(
    (projectId: string, taskId: string) =>
      dispatch({ type: "TOGGLE_TASK", projectId, taskId }),
    []
  );
  const setWorkTab = useCallback(
    (tab: ProjectCategory | "all") => dispatch({ type: "SET_WORK_TAB", tab }),
    []
  );
  const setContentBrand = useCallback(
    (brand: BrandKey) => dispatch({ type: "SET_CONTENT_BRAND", brand }),
    []
  );
  const addInboxItem = useCallback(
    (item: InboxItem) => dispatch({ type: "ADD_INBOX_ITEM", item }),
    []
  );
  const removeInboxItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE_INBOX_ITEM", id }),
    []
  );
  const addChatMessage = useCallback(
    (contentId: string, message: ChatMessage) =>
      dispatch({ type: "ADD_CHAT_MESSAGE", contentId, message }),
    []
  );
  const setChatLog = useCallback(
    (contentId: string, messages: ChatMessage[]) =>
      dispatch({ type: "SET_CHAT_LOG", contentId, messages }),
    []
  );
  const toggleAiPanel = useCallback(() => dispatch({ type: "TOGGLE_AI_PANEL" }), []);
  const addAiPanelMessage = useCallback(
    (message: ChatMessage) => dispatch({ type: "ADD_AI_PANEL_MESSAGE", message }),
    []
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      submitDayCheck,
      toggleTask,
      setWorkTab,
      setContentBrand,
      addInboxItem,
      removeInboxItem,
      addChatMessage,
      setChatLog,
      toggleAiPanel,
      addAiPanelMessage,
    }),
    [
      state,
      submitDayCheck,
      toggleTask,
      setWorkTab,
      setContentBrand,
      addInboxItem,
      removeInboxItem,
      addChatMessage,
      setChatLog,
      toggleAiPanel,
      addAiPanelMessage,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
