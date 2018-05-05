import './polyfills';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';

const mockLocalStorage = () => {
    let storage = {};
    return {
        getItem: key => key in storage ? storage[key] : null,
        setItem: (key, value) => storage[key] = value || '',
        removeItem: key => delete storage[key],
        clear: () => storage = {}
    };
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage() });
Object.defineProperty(window, 'CSS', { value: () => ({}) });
Object.defineProperty(document.body.style, 'transform', {
    value: () => {
      return {
        configurable: true,
        enumerable: true
      };
    }
});