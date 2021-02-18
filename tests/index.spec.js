import { document } from './fixtures/document';
import { generateUpdateStatement } from './../source/index';
import { it } from '@jest/globals';

describe('generateUpdateStatement', () => {
  describe('Updates to specific fields', () => {
    it('INPUT: Update value field of post with _id of 2', () => {
      expect(
        generateUpdateStatement(document, { posts: [{ _id: 2, value: 'too' }] })
      ).toEqual({ $update: { 'posts.0.value': 'too' } });
    });

    it('INPUT: Update text field in mention with _id of 5, for post with _id of 3', () => {
      expect(
        generateUpdateStatement(document, {
          posts: [{ _id: 3, mentions: [{ _id: 5, text: 'pear' }] }],
        })
      ).toEqual({ $update: { 'posts.1.mentions.0.text': 'pear' } });
    });
  });

  describe('Removing existing items', () => {
    it('INPUT: Remove post with _id of 2', () => {
      expect(
        generateUpdateStatement(document, {
          posts: [{ _id: 2, _delete: true }],
        })
      ).toEqual({ $remove: { 'posts.0': true } });
    });

    it('INPUT: Remove mention with _id of 6, for post with _id of 3', () => {
      expect(
        generateUpdateStatement(document, {
          posts: [{ _id: 3, mentions: [{ _id: 6, _delete: true }] }],
        })
      ).toEqual({ $remove: { 'posts.1.mentions.1': true } });
    });
  });

  describe('Appending to existing arrays', () => {
    it('INPUT: Add post; notice that there is no _id because the post doesnt exist yet', () => {
      expect(
        generateUpdateStatement(document, { posts: [{ value: 'four' }] })
      ).toEqual({ $add: { posts: [{ value: 'four' }] } });
    });

    it('INPUT: Add mention to post with _id of 3', () => {
      expect(
        generateUpdateStatement(document, {
          posts: [{ _id: 3, mentions: [{ text: 'banana' }] }],
        })
      ).toEqual({ $add: { 'posts.1.mentions': [{ text: 'banana' }] } });
    });
  });

  describe('Update, Add and Remove in single statement', () => {
    it('INPUT: Remove post with _id of 2', () => {
      expect(
        generateUpdateStatement(document, {
          posts: [
            { _id: 2, value: 'too' },
            { value: 'four' },
            { _id: 4, _delete: true },
          ],
        })
      ).toEqual({
        $update: { 'posts.0.value': 'too' },
        $add: { posts: [{ value: 'four' }] },
        $remove: { 'posts.2': true },
      });
    });
  });
});
