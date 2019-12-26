import { SafeResouceUrlPipe } from './safe-resouce-url.pipe';

describe('SafeResouceUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeResouceUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
