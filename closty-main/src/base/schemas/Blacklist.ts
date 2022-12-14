import { model as Model, Schema } from 'mongoose';

export default Model('blacklist',
  new Schema<BlacklistSchema>({
    user: { type: String, required: true },
    reason: { type: String, required: false, default: `` },
    addedTimestamp: { type: Date, required: true },
  }),
);