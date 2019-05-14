import { add, getFavoriteForeignFilm, returnsAnObservable } from './misc';
import { first } from 'rxjs/operators';

describe('a synchronous call', () => {
  it('can add two numbers together', () => {
    const answer = add(2, 3);
    expect(answer).toBe(5);
  });
});

describe('promises', () => {
  it('can be tricky', (done) => {
    const result = getFavoriteForeignFilm();

    result.then(a => {
      expect(a).toBe('Harakiri');
      done();
    });
  });
  it('using await', async () => {
    const result = await getFavoriteForeignFilm();
    expect(result).toBe('Harakiri');
  });
});


describe('using promises', () => {
  it('using the done thisng', (done) => {
    returnsAnObservable().subscribe(r => {
      expect(r).toBe('Eggs');
      done();
    });
  });
  it('using async await', async () => {
    // const meal = await returnsAnObservable().pipe(
    //   .first(),
    //   .map(a => a.toUpperCase())
    // ).toPromise();
    const meal = await returnsAnObservable().toPromise();
    expect(meal).toBe('Eggs');
  });
});
