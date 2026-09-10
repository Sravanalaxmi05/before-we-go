import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const plans=sqliteTable('plans',{id:text('id').primaryKey(),owner:text('owner').notNull(),venue:text('venue').notNull(),payload:text('payload').notNull(),recipientHash:text('recipient_hash').notNull(),expires:integer('expires').notNull(),created:integer('created').notNull()});
export const calls=sqliteTable('calls',{id:text('id').primaryKey().references(()=>plans.id),owner:text('owner').notNull(),state:text('state').notNull(),providerId:text('provider_id'),result:text('result'),review:text('review'),pollAfter:integer('poll_after').notNull().default(0),pollToken:text('poll_token'),created:integer('created').notNull()});
export const reservations=sqliteTable('reservations',{id:text('id').primaryKey(),recipientHash:text('recipient_hash').notNull(),created:integer('created').notNull()});
export const mutex=sqliteTable('mutex',{recipientHash:text('recipient_hash').primaryKey(),callId:text('call_id').notNull()});
export const suppression=sqliteTable('suppression',{recipientHash:text('recipient_hash').primaryKey(),reason:text('reason').notNull(),created:integer('created').notNull()});
