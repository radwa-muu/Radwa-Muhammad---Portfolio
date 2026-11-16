import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseDuration,
  formatSeconds,
  calculateProgress,
  getDirection,
  validateInquiry,
  filterProjects,
  normalizeExternalUrl
} from './portfolioLogic';

test('parseDuration parses mm:ss into seconds correctly', () => {
  assert.equal(parseDuration('0:47'), 47);
  assert.equal(parseDuration('1:31'), 91);
  assert.equal(parseDuration('0:36'), 36);
  assert.equal(parseDuration('2:00'), 120);
  assert.equal(parseDuration(''), 0);
  assert.equal(parseDuration('invalid'), 0);
});

test('formatSeconds formats total seconds into m:ss', () => {
  assert.equal(formatSeconds(0), '0:00');
  assert.equal(formatSeconds(9), '0:09');
  assert.equal(formatSeconds(47), '0:47');
  assert.equal(formatSeconds(91), '1:31');
  assert.equal(formatSeconds(125), '2:05');
});

test('calculateProgress calculates accurate percentages bounded by 0-100', () => {
  assert.equal(calculateProgress(0, 47), 0);
  assert.equal(calculateProgress(47, 47), 100);
  assert.equal(calculateProgress(23.5, 47), 50);
  assert.equal(calculateProgress(100, 47), 100);
  assert.equal(calculateProgress(10, 0), 0);
});

test('getDirection returns correct dir attribute', () => {
  assert.equal(getDirection('ar'), 'rtl');
  assert.equal(getDirection('en'), 'ltr');
});

test('validateInquiry catches empty or invalid fields', () => {
  const invalid = validateInquiry({
    name: '',
    email: 'not-an-email',
    service: 'Strategy',
    message: ''
  }, 'ar');

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateInquiry({
    name: 'سارة أحمد',
    email: 'sara@example.com',
    service: 'Social Media',
    message: 'نود إطلاق حملة تسويقية لمطعمنا الجديد'
  }, 'ar');

  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('filterProjects filters by Arabic, English or brand names', () => {
  const sample = [
    { titleAr: 'سيلفان', titleEn: 'Sylvan', brand: 'Sylvan Parquet' },
    { titleAr: 'ميديانيستا', titleEn: 'Medianesta', brand: 'Medianesta Platform' },
    { titleAr: 'الصياد العالمي', titleEn: 'World Hunter', brand: 'World Hunter Seafood' }
  ];

  assert.equal(filterProjects(sample, 'sylvan').length, 1);
  assert.equal(filterProjects(sample, 'سيلفان').length, 1);
  assert.equal(filterProjects(sample, 'Seafood').length, 1);
  assert.equal(filterProjects(sample, '').length, 3);
});

test('normalizeExternalUrl handles empty, schemeless, http/https, and mailto URLs', () => {
  assert.equal(normalizeExternalUrl(''), '');
  assert.equal(normalizeExternalUrl('   '), '');
  assert.equal(normalizeExternalUrl('https://wa.me/201207845340'), 'https://wa.me/201207845340');
  assert.equal(normalizeExternalUrl('http://example.com'), 'http://example.com');
  assert.equal(normalizeExternalUrl('x.com/radwa_muhammedd'), 'https://x.com/radwa_muhammedd');
  assert.equal(normalizeExternalUrl('mailto:radwa.work30@gmail.com'), 'mailto:radwa.work30@gmail.com');
});

