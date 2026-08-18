import { NextResponse } from 'next/server';
import { connectDB } from './mongodb';
import { normalizeUrls } from './minio';
import {
  Admin,
  Page,
  BoardMember,
  Project,
  NewsArticle,
  Album,
  MediaResource,
  Report,
  Contact,
  Setting,
  Message,
  Service,
} from './models';

export { connectDB };

export function ok(data, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(message, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function list(model, query = {}, sort = { createdAt: -1 }) {
  await connectDB();
  const docs = await model.find(query).sort(sort).lean();
  return ok(normalizeUrls(docs));
}

export async function detail(model, id) {
  await connectDB();
  const doc = await model.findById(id).lean();
  if (!doc) return fail('Not found', 404);
  return ok(normalizeUrls(doc));
}

export async function detailBySlug(model, slug) {
  await connectDB();
  const doc = await model.findOne({ slug }).lean();
  if (!doc) return fail('Not found', 404);
  return ok(normalizeUrls(doc));
}

export async function create(model, body, allowlist = null) {
  await connectDB();
  const data = normalizeUrls(pickFields(body, allowlist));
  const doc = new model(data);
  await doc.save();
  return ok(normalizeUrls(doc.toObject()), 201);
}

export async function update(model, id, body, allowlist = null) {
  await connectDB();
  const data = normalizeUrls(pickFields(body, allowlist));
  const doc = await model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  if (!doc) return fail('Not found', 404);
  return ok(normalizeUrls(doc));
}

export async function remove(model, id) {
  await connectDB();
  const doc = await model.findByIdAndDelete(id).lean();
  if (!doc) return fail('Not found', 404);
  return ok({ id });
}

export function pickFields(body, allowlist) {
  if (!allowlist) return body;
  const data = {};
  for (const key of allowlist) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  return data;
}

export {
  Admin,
  Page,
  BoardMember,
  Project,
  NewsArticle,
  Album,
  MediaResource,
  Report,
  Contact,
  Setting,
  Message,
  Service,
};
