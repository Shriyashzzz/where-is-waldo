// escape hatch module incase type checks fucks my system, if there is nothing here, that's the best case scenario
import { GameAvatars } from "../modals/characterStore.ts";

declare module "express-session" {
  interface SessionData {
    avatars: GameAvatars;
  }
}
