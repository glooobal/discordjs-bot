import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
});

export const Guild = model('Guild', guildSchema);
