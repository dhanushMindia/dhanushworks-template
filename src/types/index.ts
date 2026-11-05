export * from "./blocks";

import { JournalEntry, User, Profile, MediaAsset } from "@prisma/client";
import { ContentBlock } from "./blocks";

export interface JournalEntryWithRelations extends JournalEntry {
  attachments?: any[];
}
