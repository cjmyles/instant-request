import assert from 'assert';
import { Request } from '../src/index';

describe('Instant Request', () => {
  it('Request should exist', () => {
    assert.equal(typeof Request, 'function');
  });
});
