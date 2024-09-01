export default function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timerId: any = null;

  return function (...args: Parameters<T>) {
    const context= this;

    if (timerId!== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
