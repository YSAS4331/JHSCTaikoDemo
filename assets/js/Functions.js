((w,f) => w.modules = f())(window, () => {
  // querySelector系統
  const $ = (s,r=document) => r.querySelector(s);
  const $$ = (s,r=document) => [...r.querySelectorAll(s)];

  // イベント系統
  const on = (ev, fn, el=document) => {
    el.addEventListener(ev, fn);
    return { ev, fn, el };
  };

  const off = (eventObj) => {
    if (!eventObj) return;
    const { ev, fn, el } = eventObj;
    el.removeEventListener(ev, fn);
  };

  const add = (el, cls) => el.classList.add(cls);

  const rmv = (el, cls) => el.classList.remove(cls);

  //チェーン可能メソッド
  const chain = el => {
    const on = (ev, fn) => {
      el.addEventListener(ev, fn);
      return api;
    }

    const off = (ev, fn) => {
      el.removeEventListener(ev, fn);
      return api;
    }

    const add = cls => {
      el.classList.add(cls);
      return api;
    }

    const rmv = cls => {
      el.classList.remove(cls);
      return api;
    }

    const attr = (n, v) => {
      el.setAttribute(n, v);
      return api;
    }

    const set = (prop, value) => {
      el[prop] = value;
      return api;
    }

    const api = { on, off, add, rmv, attr, set };

    return api;
  }

  return { $, $$, on, off, add, rmv, chain };
});
