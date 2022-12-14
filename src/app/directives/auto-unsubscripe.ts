/**
 * directive that takes any component and auto unsubscribe from the subscribed elements.
 * @param constructor
 */
export function AutoUnsubscribe(constructor: any) {
  const original = constructor.prototype.ngOnDestroy;

  constructor.prototype.ngOnDestroy = function () {
    for (let prop in this) {
      const property = this[prop];
      if (property && typeof property.unsubscribe === 'function') {
        property.unsubscribe();
      }
    }
    original &&
      typeof original === 'function' &&
      original.apply(this, arguments);
  };
}
