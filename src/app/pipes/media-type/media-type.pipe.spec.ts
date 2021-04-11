import { VideoTypePipe } from './media-type.pipe';

describe('MediaTypePipe', () => {
  it('create an instance', () => {
    const pipe = new VideoTypePipe();
    expect(pipe).toBeTruthy();
  });
});
